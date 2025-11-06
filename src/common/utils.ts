export interface AvailableIntegration  {
    integration: string;
    label: string;
    icon: string;
    type: string;
}

export const availableIntegrations: AvailableIntegration[] = [
    {
        "integration": "slack",
        "label": "Slack: Simple Message",
        "icon": "slack.png",
        "type": "simplePostMessage" // operation type for the backend
    },
    {
        "integration": "slack",
        "label": "Slack: Block Message",
        "icon": "slack.png",
        "type": "postBlockMessage" // operation type for the backend
    },
    {
        "integration": "slack",
        "label": "Slack: Schedule Simple Message",
        "icon": "slack.png",
        "type": "scheduleSimplePostMessage" // operation type for the backend
    },
    {
        "integration": "slack",
        "label": "Slack: Schedule Block Message",
        "icon": "slack.png",
        "type": "scheduleSimpleBlockMessage" // operation type for the backend
    }, 

]