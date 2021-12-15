import axios from "axios";

export default class PostService {
    static async getPage(pageFilter: PageFilter) {
        return await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _page: pageFilter.page,
                _limit: pageFilter.onPage
            }
        });
    }
}
