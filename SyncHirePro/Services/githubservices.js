require('dotenv').config()
const axios = require('axios')

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function fetchgithubprofiles(username) {
    const query = `query {
        user(login: "${username}") {
            name 
            email
            bio 
            location 
            avatarUrl
            repositories(first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
                nodes {
                    name
                    description
                    stargazerCount
                    primaryLanguage {
                        name
                    }
                }
            }
        }
    }`;

try {
    const response = await axios.post(GITHUB_GRAPHQL_URL,{query},{
        headers: {
            Authorization : `Bearer ${GITHUB_TOKEN}`,
            'Content-Type' : 'application/json'
        }
    })

    console.log('GitHub API Response:', JSON.stringify(response.data, null, 2));

    if (response.data.errors) {
        console.error('GitHub API Errors:', response.data.errors);
        return null;
    }

    return response.data.data?.user || null;
    
} catch (error) {
    console.error('Error fectching the profile',error.response?.data||error)
    return null
}
                        }

module.exports = {
    fetchgithubprofiles
}