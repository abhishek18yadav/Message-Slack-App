import { MAIL_ID } from "../../config/serverconfig.js"

export const workspaceJoinMail = function (workspace) {
    return {
        from: MAIL_ID,
        subject: 'you have been added to workspace',
        text: `congratulations! You have been added to workspace ${workspace.name}`
    };
}