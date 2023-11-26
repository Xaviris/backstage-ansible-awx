import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Progress, ResponseErrorPanel, Table } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: "50%"
  }
});
const DenseTable = ({ templates, onRunJob }) => {
  var _a;
  useStyles();
  const { entity } = useEntity();
  const annotationKey = "ansible/template-labels";
  const annotationValue = (_a = entity.metadata.annotations) == null ? void 0 : _a[annotationKey];
  if (!annotationValue) {
    return /* @__PURE__ */ React.createElement("div", null, "No specific annotation found for this entity.");
  }
  const selectedLabelsArray = annotationValue.split(",").map((label) => label.trim());
  const columns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
    { title: "Last Run", field: "lastRun" },
    { title: "Status", field: "status" },
    { title: "Label", field: "label" },
    { title: "", field: "run" }
  ];
  const data = templates.filter((template) => {
    const labelsArray = template["summary_fields"]["labels"]["results"];
    return labelsArray.some((label) => selectedLabelsArray.includes(label.name));
  }).map((template) => {
    const labelsArray = template["summary_fields"]["labels"]["results"];
    const labelsString = labelsArray.map((label) => label.name).join(", ");
    let statusComponent;
    const date = new Date(template.last_job_run);
    const humanReadableDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    switch (template.status) {
      case "successful":
        statusComponent = /* @__PURE__ */ React.createElement(CheckCircleOutlineIcon, { style: { fontSize: 24 } });
        break;
      case "error":
        statusComponent = /* @__PURE__ */ React.createElement(ErrorOutlineIcon, { style: { fontSize: 24 } });
        break;
      case "running":
        statusComponent = /* @__PURE__ */ React.createElement(CircularProgress, { size: 24 });
        break;
      default:
        statusComponent = /* @__PURE__ */ React.createElement("div", null, template.status);
    }
    return {
      id: template.id,
      description: template.description,
      lastRun: humanReadableDate,
      name: template.name,
      status: statusComponent,
      label: labelsString,
      run: /* @__PURE__ */ React.createElement(RocketLaunchIcon, { onClick: () => onRunJob(String(template.id)) })
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
  return /* @__PURE__ */ React.createElement(
    Table,
    {
      title: "Ansible Job Templates",
      options: { search: false, paging: false },
      columns,
      data
    }
  );
};
const EntityAWXContent = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useState({});
  const [runningJobs, setRunningJobs] = useState({});
  const templatesRef = useRef(templates);
  useEffect(() => {
    templatesRef.current = templates;
  }, [templates]);
  async function fetchTemplates() {
    const response = await fetch("http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/organizations/2/job_templates/");
    const data = await response.json();
    console.log("API Response: ", data);
    setTemplates(data.results || []);
  }
  const handleRunJob = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    };
    console.log("Start job", id);
    fetch("http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/job_templates/" + id + "/launch/", requestOptions).then(() => {
      fetchTemplates();
      setRunningJobs((prevJobs) => ({ ...prevJobs, [id]: true }));
    }).catch((error2) => console.error("Error launching job", error2));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      Object.keys(runningJobs).forEach(async (jobId) => {
        if (!runningJobs[jobId])
          return;
        await fetchTemplates();
        const updatedJobTemplate = templatesRef.current.find((template) => template.id.toString() === jobId);
        if (updatedJobTemplate && updatedJobTemplate.status === "successful") {
          console.log("End Loop");
          setRunningJobs((prevJobs) => {
            const updatedJobs = { ...prevJobs };
            delete updatedJobs[jobId];
            return updatedJobs;
          });
        }
      });
    }, 500);
    return () => clearInterval(intervalId);
  }, [runningJobs]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTemplates();
        setLoading(false);
      } catch (err) {
        console.error("Fetching error:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return /* @__PURE__ */ React.createElement(Progress, null);
  } else if (error) {
    return /* @__PURE__ */ React.createElement(ResponseErrorPanel, { error });
  }
  return /* @__PURE__ */ React.createElement(DenseTable, { templates, onRunJob: handleRunJob });
};

export { EntityAWXContent };
//# sourceMappingURL=index-f85d1e43.esm.js.map
