import { gql } from '@apollo/client'

export const CONTENT_QUERY = gql`{
	personalData(id: "2wscO3EoyDEFK5PPX4R424") {
		name
		subheading
		email
		profile {
			json
		}
		location
		mediaLinksCollection(limit: 100) {
			items {
				iconId
				linkLabel
				url
				iconWithLabel
			}
		}
		profilePicture{
			url
			width
			height
			description
		}
	}
	qualificationsCollection(limit: 100) {
		items {
			name
			description {
				json
			}
			rating
		}
	}
	companyCollection(limit: 100, order: startDate_DESC) {
		items {
			companyName
			startDate
			finishDate
			linkedFrom {
				projectCollection(limit: 100, order: year_DESC) {
					items {
						year
						projectName
						positionDescription {
							json
						}
						allowPageBreak
					}
				}
			}
		}
	}
	siteStringsCollection(limit: 100) {
		items{
			identifier
			content
		}
	}
}
`