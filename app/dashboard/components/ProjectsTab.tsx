import type { FormEvent } from 'react'
import Image from 'next/image'
import { inputClassName } from '../constants'
import type { Project, ProjectFormState } from '../types'
import { EmptyState, Field, ListSkeleton } from './DashboardPrimitives'

interface ProjectsTabProps {
    currentLoading: boolean
    showProjectForm: boolean
    savingProject: boolean
    editingProjectId: number | null
    deletingKey: string | null
    projectForm: ProjectFormState
    filteredProjects: Project[]
    onToggleForm: () => void
    onResetProjectForm: () => void
    onProjectFormChange: (form: ProjectFormState) => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onEditProject: (project: Project) => void
    onDeleteProject: (projectId: number) => void
}

export function ProjectsTab({
    currentLoading,
    showProjectForm,
    savingProject,
    editingProjectId,
    deletingKey,
    projectForm,
    filteredProjects,
    onToggleForm,
    onResetProjectForm,
    onProjectFormChange,
    onSubmit,
    onEditProject,
    onDeleteProject,
}: ProjectsTabProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Projects</h2>
                    <p className="text-sm text-slate-500">Create, edit, and remove portfolio projects.</p>
                </div>
                <button
                    onClick={onToggleForm}
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
                >
                    {showProjectForm ? 'Close Form' : 'New Project'}
                </button>
            </div>

            {showProjectForm && (
                <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                            {editingProjectId ? 'Edit Project' : 'Create Project'}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Title *">
                            <input
                                type="text"
                                value={projectForm.title}
                                onChange={(event) => onProjectFormChange({ ...projectForm, title: event.target.value })}
                                required
                                className={inputClassName}
                            />
                        </Field>
                        <Field label="Image URL">
                            <input
                                type="url"
                                value={projectForm.image}
                                onChange={(event) => onProjectFormChange({ ...projectForm, image: event.target.value })}
                                className={inputClassName}
                            />
                        </Field>
                    </div>

                    <div className="mt-4">
                        <Field label="Description">
                            <textarea
                                value={projectForm.description}
                                onChange={(event) => onProjectFormChange({ ...projectForm, description: event.target.value })}
                                rows={4}
                                className={inputClassName}
                            />
                        </Field>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="GitHub Frontend">
                            <input
                                type="url"
                                value={projectForm.github_frontend || ''}
                                onChange={(event) => onProjectFormChange({ ...projectForm, github_frontend: event.target.value })}
                                className={inputClassName}
                            />
                        </Field>
                        <Field label="GitHub Backend">
                            <input
                                type="url"
                                value={projectForm.github_backend || ''}
                                onChange={(event) => onProjectFormChange({ ...projectForm, github_backend: event.target.value })}
                                className={inputClassName}
                            />
                        </Field>
                        <Field label="Live URL">
                            <input
                                type="url"
                                value={projectForm.live_at}
                                onChange={(event) => onProjectFormChange({ ...projectForm, live_at: event.target.value })}
                                className={inputClassName}
                            />
                        </Field>
                    </div>

                    <div className="mt-4">
                        <Field label="Technologies">
                            <textarea
                                rows={3}
                                className={inputClassName}
                                value={projectForm.technologiesRaw || (projectForm.technologies || []).join('; ')}
                                onChange={(event) =>
                                    onProjectFormChange({
                                        ...projectForm,
                                        technologiesRaw: event.target.value,
                                    })
                                }
                                placeholder="React, Next.js; FastAPI, TypeScript (comma, semicolon only)"
                            />
                        </Field>
                        <p className="mt-1 text-xs font-medium text-red-600">
                            Use , or ; separators to list technologies.
                        </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="submit"
                            disabled={savingProject}
                            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            {savingProject
                                ? editingProjectId
                                    ? 'Updating...'
                                    : 'Creating...'
                                : editingProjectId
                                    ? 'Update Project'
                                    : 'Create Project'}
                        </button>
                        <button
                            type="button"
                            onClick={onResetProjectForm}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-slate-700 hover:bg-white"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {currentLoading ? (
                <ListSkeleton />
            ) : (
                <div className="space-y-4">
                    {filteredProjects.length === 0 ? (
                        <EmptyState text="No projects found." />
                    ) : (
                        filteredProjects.map((project) => (
                            <div key={project.id ?? project.title} className="rounded-2xl border border-slate-200 p-4">
                                <div className="flex flex-col gap-4 lg:flex-row">
                                    {project.image && (
                                        <div className="relative h-40 overflow-hidden rounded-xl bg-slate-100 lg:h-32 lg:w-56 lg:shrink-0">
                                            <Image src={project.image} alt={project.title} fill className="object-cover" loading="eager" />
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-slate-900 wrap-break-word">{project.title}</h3>
                                                {project.description && (
                                                    <p className="mt-1 text-sm text-slate-600 wrap-break-word">{project.description}</p>
                                                )}
                                            </div>

                                            {project.id && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => onEditProject(project)}
                                                        className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => onDeleteProject(project.id as number)}
                                                        disabled={deletingKey === `project-${project.id}`}
                                                        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-60"
                                                    >
                                                        {deletingKey === `project-${project.id}` ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <span key={tech} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                            {project.github_backend && (
                                                <a
                                                    href={project.github_backend}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="break-all text-blue-600 hover:text-blue-800"
                                                >
                                                    GitHub Backend
                                                </a>
                                            )}
                                            {project.github_frontend && (
                                                <a
                                                    href={project.github_frontend}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="break-all text-blue-600 hover:text-blue-800"
                                                >
                                                    GitHub Frontend
                                                </a>
                                            )}
                                            {project.live_at && (
                                                <a
                                                    href={project.live_at}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="break-all text-blue-600 hover:text-blue-800"
                                                >
                                                    Live Site
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
