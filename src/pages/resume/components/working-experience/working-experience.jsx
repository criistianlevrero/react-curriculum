import PropTypes from 'prop-types';

import { Project } from './project/project';
import { Company } from './company/company';

import { ContentfulRichtext } from '@components/contentful-richtext/contentful-richtext';

import { getMonthYear, getYear } from '@services/helpers'

export const WorkingExperience = ({ dataModel }) => {
    return (
        <>
            {dataModel.map((company, index) => (
                <Company companyName={company.companyName} from={getMonthYear(company.startDate)} to={getMonthYear(company.finishDate)} key={index}>
                {company.linkedFrom.projectCollection.items.map((project, index) => (
                    <Project projectName={project.projectName} year={getYear(project.year)} key={index}>
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