import PropTypes from 'prop-types';

import { Project } from './project/project';
import { Company } from './company/company';

import { ContentfulRichtext } from '@components/contentful-richtext/contentful-richtext';

import { getMonthYear, getYear } from '@services/helpers'

export const WorkingExperience = ({ dataModel }) => {
    return (
        <>
            {dataModel.map((company) => (
                <Company companyName={company.companyName} from={getMonthYear(company.startDate)} to={getMonthYear(company.finishDate)} key={company.sys.id}>
                {company.projects.map((project) => (
                    <Project projectName={project.projectName} year={getYear(project.year)} allowBreak={project.allowPageBreak} key={project.sys.id}>
                        <ContentfulRichtext richtext={project.positionDescription?.json} />
                    </Project>
                ))}
                </Company>
            ))}
        </>
    )
}

WorkingExperience.propTypes = {
    dataModel: PropTypes.array.isRequired
}