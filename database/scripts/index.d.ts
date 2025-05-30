import Docker from 'dockerode';

export function buildDockerImage(): Promise<void>;
export function startDockerContainer(
    containerName?: string
): Promise<Docker.Container>;
export function stopDockerContainer(container: Docker.Container): Promise<void>;
