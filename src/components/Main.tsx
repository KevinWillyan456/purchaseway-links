import Button from './Button'
import Card from './Card'
import './Main.css'

const mockData = [
    {
        title: 'GitHub',
        body: `GitHub is a web-based platform used for version control. Git simplifies the process of working with other people and makes it easy to collaborate on projects. Team members can work on files and easily merge their changes in with the master branch of the project.`,
        url: 'https://github.com',
    },
    {
        title: 'GitLab',
        body: `GitLab is a web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking and CI/CD pipeline features, using an open-source license, developed by GitLab Inc.`,
        url: 'https://gitlab.com',
    },
    {
        title: 'Bitbucket',
        body: `Bitbucket is a web-based version control repository hosting service owned by Atlassian, for source code and development projects that use either Mercurial or Git revision control systems.`,
        url: 'https://bitbucket.org',
    },
    {
        title: 'SourceForge',
        body: `SourceForge is a web-based service that offers software developers a centralized online location to control and manage free and open-source software projects.`,
        url: 'https://sourceforge.net',
    },
    {
        title: 'GitKraken',
        body: `GitKraken is a Git client for Windows, Mac, and Linux, which helps make the process of working with Git easier and more visual. It has a beautiful UI, and is feature-rich.`,
        url: 'https://www.gitkraken.com',
    },
    {
        title: 'Git',
        body: `Git is a distributed version-control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.`,
        url: 'https://git-scm.com',
    },
]

function Main() {
    return (
        <section className="main">
            <div className="title">Purchaseway Links</div>
            <Button text="Novo" icon="plus" />
            <section className="container-cards">
                {mockData.map((data) => (
                    <Card title={data.title} body={data.body} url={data.url} />
                ))}
            </section>
        </section>
    )
}

export default Main
