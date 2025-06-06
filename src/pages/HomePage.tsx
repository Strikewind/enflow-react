import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import ChatTab from './ChatTab';

const tabs = [
    { id: 'settings', label: 'Project Settings' },
    { id: 'chat', label: 'Chat' },
    { id: 'library', label: 'Library' },
    // { id: 'compliance', label: 'Compliance' },
    { id: 'exports', label: 'Exports' },
];

type TabId = 'chat' | 'settings' | 'library' | 'compliance' | 'exports';

type SideBarProps = {
	activeTab: TabId;
	setActiveTab: (tabId: TabId) => void;
}

const SideBar = ({ activeTab, setActiveTab }: SideBarProps) => {
	
	const { toggleTheme } = useContext(ThemeContext);

	return (
		<div className="sidebar">
			<div>
				<Link to="/">
					<div className="logo" />
				</Link>
				<div className='horiz-divider' />
				<nav className="sidebar-nav">
					{tabs.map(tab => (
						<button
							key={tab.id}
							className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
							onClick={() => setActiveTab(tab.id as TabId)}
							>
							{tab.label}
						</button>
					))}
				</nav>
			</div>

			<div className='sidebar-bottom'>
				<div className='horiz-divider' />
				<div className='sidebar-row'>
					<Link to="/account" className='sidebar-row'>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<div className='account-icon' />
							<p>Account Settings</p>
						</div>
					</Link>
					<div className='theme-toggle' onClick={toggleTheme} />
				</div>
			</div>
		</div>
	)
}

const HomePage = () => {
    const [activeTab, setActiveTab] = useState<TabId>('chat');

    return (
        <div className="fullscreen-layout">
			<div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh' }}>
				<SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
				{activeTab === 'chat' && <ChatTab />}
				{activeTab === 'settings' && <div>Project Settings Placeholder</div>}
				{activeTab === 'library' && <div>Library Placeholder</div>}
				{/* {activeTab === 'compliance' && <div>Compliance Placeholder</div>} */}
				{activeTab === 'exports' && <div>Exports Placeholder</div>}
			</div>
        </div>
    );
};

export default HomePage;
