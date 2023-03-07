const {RESTDataSource} = require('apollo-datasource-rest')

class ProjectService extends RESTDataSource {
    constructor() {
        super();
        this.baseURL='http://localhost:3000'
    }

    getProjects(){
        return this.get('/projects').then((project) =>{
            return project;
        }).catch(error=>console.error(error)) 
    }

    async getProjectById(id){
        return await this.get(`/projects/${id}`)
    }


}
module.exports = ProjectService;