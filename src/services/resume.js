// Resolves a resume into the blocks the page renders: block fields left empty
// are inherited from `basedOn`, then every block with a replacement is swapped
// for it. Unpublished links come back as null and are dropped.

const items = (collection) => (collection?.items ?? []).filter(Boolean)

const ownOrInherited = (own, inherited) => (own.length > 0 ? own : inherited)

const byDateDesc = (field) => (a, b) => new Date(b[field]) - new Date(a[field])

function groupByCompany(projects) {
    const companies = new Map()
    for (const project of projects) {
        const company = project.company
        if (!company) continue
        if (!companies.has(company.sys.id)) companies.set(company.sys.id, { ...company, projects: [] })
        companies.get(company.sys.id).projects.push(project)
    }
    return [...companies.values()]
        .sort(byDateDesc('startDate'))
        .map((company) => ({ ...company, projects: company.projects.sort(byDateDesc('year')) }))
}

export function resolveResume(resume) {
    const base = resume.basedOn

    const replacements = new Map(
        items(resume.replacementsCollection)
            .filter((replacement) => replacement.replaces)
            .map((replacement) => [replacement.replaces.sys.id, replacement])
    )
    const replace = (block) => replacements.get(block.sys.id) ?? block

    const personalData = resume.personalData ?? base?.personalData
    const qualifications = ownOrInherited(items(resume.qualificationsCollection), items(base?.qualificationsCollection))
    const projects = ownOrInherited(items(resume.projectsCollection), items(base?.projectsCollection))

    return {
        personalData: personalData && replace(personalData),
        qualifications: qualifications.map(replace),
        companies: groupByCompany(projects.map(replace)),
    }
}
