import { Link } from 'react-router-dom';

type Project = {
	id: string;
	title: string;
	description: string;
};

const projects: Project[] = [
	{ id: 'alpha',   title: 'Project Alpha',   description: 'Analyze satellite data streams.' },
	// { id: 'beta',    title: 'Project Beta',    description: 'Automate document ingestion.' },
	// { id: 'gamma',   title: 'Project Gamma',   description: '3D model RAG integration.' },
	// { id: 'delta',   title: 'Project Delta',   description: 'SharePoint connector MVP.' },
	// { id: 'epsilon', title: 'Project Epsilon', description: 'Video file RAG proof-of-concept.' },
];

const ProjectsGrid = () => {
	return (
		<div className="projects-page">
				<div className="projects-grid">
					{projects.map((proj) => (
					<div>
						<Link key={proj.id} to={`/${proj.id}/home`} className="project-tile">
							<h2>{proj.title}</h2>
							<div className="project-tile-2">
								<p>{proj.description}</p>
							</div>
						</Link>
					</div>
					))}
					<div>
						<Link to="/new" className="project-tile"> {/* TODO: popup instead */ }
							<h2>New Project</h2>
							<div className="new-project-tile" />
						</Link>
					</div>
				</div>
		</div>
	);
}

const ProjectsPage = () => {
	return (
		<div className="fullscreen-layout">
			<ProjectsGrid />
		</div>
	);
};

export default ProjectsPage;
