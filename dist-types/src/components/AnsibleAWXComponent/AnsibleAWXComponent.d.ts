import React from 'react';
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
export declare const DenseTable: ({ templates, onRunJob }: DenseTableProps) => React.JSX.Element;
export declare const EntityAWXContent: () => React.JSX.Element;
export {};
