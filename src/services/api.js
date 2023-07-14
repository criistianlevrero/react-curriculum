const query = `{
	personalData(id: "2wscO3EoyDEFK5PPX4R424") {
		name
		subheading
		email
		profile {
			json
		}
		location
	}
	qualificationsCollection(limit: 100){
		items{
			name
			description {
				json
			}
			rating
		}
	}
	companyCollection(limit:100 order:startDate_DESC){
		items{
			companyName
			startDate
			finishDate
			linkedFrom{
				projectCollection(limit:100){
					items{
						year
						projectName
						positionDescription{json}
					}
				}
			}
		}
	}
}
`;
export default function fetchData(setpageModel) {
    window.fetch(`https://graphql.contentful.com/content/v1/spaces/h2xj79xdxq5r/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Authenticate the request
            Authorization: "Bearer dtD_lAL0wrlAybfYaTIZ7Fk4yWwHufbpTWaibFd2VwE",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
        })
        .then((response) => response.json())
        .then(({ data, errors }) => {
        if (errors) {
            console.error(errors);
        }
    
        console.log(data);
        // rerender the entire component with new data
        setpageModel(data);
    });
}