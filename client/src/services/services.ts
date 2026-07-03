import api from "@/lib/axios";

export type Workspace = {
  _id: string;
  name: string;
  description: string;
  owner:
    | {
        name: string;
        email: string;
      }
    | string;
  members: string[];
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
  workspace: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  project?: {
    _id: string;
    name: string;
  };
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
};

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");

  return data.data;
};

export const getWorkspaces = async () => {
  const { data } = await api.get<{
    success: boolean;
    count: number;
    workspaces: Workspace[];
  }>("/workspaces");

  return data;
};

export const getProjects = async () => {
  const { data } = await api.get<{
    success: boolean;
    count: number;
    projects: Project[];
  }>("/projects");

  return data;
};

export const getTasks = async () => {
  const { data } = await api.get<{
    success: boolean;
    count: number;
    tasks: Task[];
  }>("/tasks");

  return data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  projectId: string;
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
  assignedTo?: string;
}) => {
  const { data } = await api.post("/tasks", task);
  return data;
};

export const updateTask = async (
  id: string,
  task: {
    title: string;
    description?: string;
    status: "Todo" | "In Progress" | "Done";
    priority: "Low" | "Medium" | "High";
    dueDate?: string;
    assignedTo?: string | null;
  },
) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id: string) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export const getWorkspaceById = async (id: string) => {
  const { data } = await api.get<{
    success: boolean;
    count: number;
    workspaces: Workspace[];
  }>("/workspaces");

  return data.workspaces.find((workspace) => workspace._id === id);
};

export const createWorkspace = async (workspace: {
  name: string;
  description: string;
}) => {
  const { data } = await api.post("/workspaces", workspace);
  return data;
};

export const createProject = async (project: {
  name: string;
  description: string;
  workspaceId: string;
}) => {
  const { data } = await api.post("/projects", project);
  return data;
};

export const updateProject = async (
  id: string,
  project: {
    name: string;
    description: string;
    status: string;
  },
) => {
  const { data } = await api.put(`/projects/${id}`, project);
  return data;
};

export const deleteProject = async (id: string) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

export const updateWorkspace = async (
  id: string,
  workspace: {
    name: string;
    description: string;
  },
) => {
  const { data } = await api.put(`/workspaces/${id}`, workspace);
  return data;
};

export const deleteWorkspace = async (id: string) => {
  const { data } = await api.delete(`/workspaces/${id}`);
  return data;
};
