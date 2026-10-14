import { gql } from '@apollo/client'

export const CONTENT_QUERY = gql`
fragment PersonalDataFields on PersonalData {
	sys { id }
	name
	subheading
	email
	profile {
		json
	}
	location
	mediaLinksCollection(limit: 20) {
		items {
			iconId
			linkLabel
			url
			iconWithLabel
		}
	}
	profilePicture {
		url
		width
		height
		description
	}
}

fragment QualificationFields on Qualifications {
	sys { id }
	name
	description {
		json
	}
	rating
}

fragment ProjectFields on Project {
	sys { id }
	year
	projectName
	positionDescription {
		json
	}
	allowPageBreak
	company {
		sys { id }
		companyName
		startDate
		finishDate
	}
}

fragment ResumeBlocks on Resume {
	personalData {
		...PersonalDataFields
	}
	qualificationsCollection(limit: 50) {
		items {
			...QualificationFields
		}
	}
	projectsCollection(limit: 50) {
		items {
			...ProjectFields
		}
	}
}

query Resume($where: ResumeFilter!) {
	resumeCollection(where: $where, limit: 1) {
		items {
			...ResumeBlocks
			basedOn {
				...ResumeBlocks
			}
			replacementsCollection(limit: 50) {
				items {
					... on PersonalData {
						...PersonalDataFields
						replaces { sys { id } }
					}
					... on Qualifications {
						...QualificationFields
						replaces { sys { id } }
					}
					... on Project {
						...ProjectFields
						replaces { sys { id } }
					}
				}
			}
		}
	}
	siteStringsCollection(limit: 100) {
		items {
			identifier
			content
		}
	}
}
`
