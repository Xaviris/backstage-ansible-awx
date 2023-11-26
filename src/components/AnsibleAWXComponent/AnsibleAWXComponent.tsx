import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const useStyles = makeStyles({
    avatar: {
        height: 32,
        width: 32,
        borderRadius: '50%',
    },
});

type JobTemplate = {
    created: string;
    description: string;
    id: number;
    last_job_failed: boolean;
    last_job_success: boolean;
    last_job_run: string;
    modified: string;
    name: string;
    playbook: string;
    status: string;
    url: string;
    summary_fields: any;
};

type DenseTableProps = {
    templates: JobTemplate[];
    onRunJob: (id: string) => void;
};


export const DenseTable = ({ templates, onRunJob }: DenseTableProps) => {

    const classes = useStyles();
    const { entity } = useEntity();

    const annotationKey = 'ansible/template-labels';
    const annotationValue = entity.metadata.annotations?.[annotationKey];

    if (!annotationValue) {
        // Handle the case where the annotation doesn't exist
        return <div>No specific annotation found for this entity.</div>;
    }

    const selectedLabelsArray = annotationValue.split(',').map(label => label.trim());


    const columns: TableColumn[] = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Last Run', field: 'lastRun' },
        { title: 'Status', field: 'status' },
        { title: 'Label', field: 'label' },
        { title: '', field: 'run' },

    ];

    const data = templates
        .filter(template => {
            const labelsArray = template["summary_fields"]["labels"]["results"];
            // Check if the labelsArray includes a label that matches selectedLabel
            return labelsArray.some(label => selectedLabelsArray.includes(label.name));
        })
        .map(template => {
            const labelsArray = template["summary_fields"]["labels"]["results"];
            const labelsString = labelsArray.map(label => label.name).join(', ');
            let statusComponent;

            const date = new Date(template.last_job_run);

            const humanReadableDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

            switch (template.status) {
                case 'successful':
                    statusComponent = <CheckCircleOutlineIcon style={{ fontSize: 24 }} />;
                    break;
                case 'error':
                    statusComponent = <ErrorOutlineIcon style={{ fontSize: 24 }} />;
                    break;
                case 'running':
                    statusComponent = <CircularProgress size={24} />;
                    break;
                default:
                    statusComponent = <div>{template.status}</div>;
            }
            return {
                id: template.id,
                description: template.description,
                lastRun: humanReadableDate,
                name: template.name,
                status: statusComponent,
                label: labelsString,
                run: (
                    <RocketLaunchIcon onClick={() => onRunJob(String(template.id))} />
                )
                // url: (
                //     <a
                //         href={`http://devops.ascentapi.com/#/templates${template.url.replace('/api/v2/job_templates', '/job_template')}details`}
                //         target="_blank"
                //         rel="noopener noreferrer">
                //         Open
                //     </a>
                // )
            };
        });

    return (
        <Table
            title="Ansible Job Templates"
            options={{ search: false, paging: false }}
            columns={columns}
            data={data}
        />
    );
};

export const EntityAWXContent = () => {
    const [templates, setTemplates] = useState<JobTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [intervals, setIntervals] = useState({});
    const [runningJobs, setRunningJobs] = useState({});

    const templatesRef = useRef(templates);

    useEffect(() => {
        templatesRef.current = templates;
    }, [templates]);

    async function fetchTemplates() {
        const response = await fetch('http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/organizations/2/job_templates/');
        const data = await response.json();
        console.log("API Response: ", data);

        // Assuming data.results contains the array of job templates
        setTemplates(data.results || []);
    }

    const handleRunJob = (id: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("Start job", id);

        fetch('http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/job_templates/' + id + '/launch/', requestOptions)
            .then(() => {
                fetchTemplates();
                setRunningJobs(prevJobs => ({ ...prevJobs, [id]: true }));
            })
            .catch(error => console.error("Error launching job", error));
    };

    // poll for running jobs
    useEffect(() => {
        const intervalId = setInterval(() => {
            Object.keys(runningJobs).forEach(async (jobId) => {
                if (!runningJobs[jobId]) return; // Skip if the job is no longer running

                await fetchTemplates();
                const updatedJobTemplate = templatesRef.current.find(template => template.id.toString() === jobId);

                if (updatedJobTemplate && updatedJobTemplate.status === "successful") {
                    console.log("End Loop")
                    setRunningJobs(prevJobs => {
                        const updatedJobs = { ...prevJobs };
                        delete updatedJobs[jobId];
                        return updatedJobs;
                    });
                }
            });
        }, 500);

        return () => clearInterval(intervalId);
    }, [runningJobs]);


    // const handleRunJob = (id: string) => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //     };
    //     console.log("Start job", id);

    //     fetch('http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/job_templates/' + id + '/launch/', requestOptions)
    //         .then(() => {
    //             const intervalId = setInterval(() => {
    //                 fetchTemplates().then(() => {
    //                     const updatedJobTemplate = templatesRef.current.find(template => template.id.toString() === id);

    //                     if (updatedJobTemplate && updatedJobTemplate.status === "successful") {
    //                         console.log("Stop Interval", updatedJobTemplate);
    //                         clearInterval(intervals[id]);
    //                         setIntervals(prevIntervals => {
    //                             const newIntervals = { ...prevIntervals };
    //                             delete newIntervals[id];
    //                             return newIntervals;
    //                         });
    //                     }
    //                 });
    //             }, 500); // Runs every 500 ms (0.5 seconds)

    //             setIntervals(prevIntervals => ({ ...prevIntervals, [id]: intervalId }));
    //         })
    //         .catch(error => console.error("Error launching job", error));
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchTemplates();
                setLoading(false);
            } catch (err) {
                console.error('Fetching error:', err);
                setError(err as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     return () => {
    //         Object.values(intervals).forEach(clearInterval);
    //     };
    // }, [intervals]);

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <ResponseErrorPanel error={error} />;
    }

    return <DenseTable templates={templates} onRunJob={handleRunJob} />;
};
