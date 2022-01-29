declare module "*.module.css";
declare module "*.module.scss";

type Post = {
    userId?: number,
    id: number,
    title: string
    body: string,
}

type PostList = Array<Post>;

type PostComment = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

type PostComments = Array<PostComment>
type PostFilterDataOrderBy = "id" | "title" | "body";

type PostFilterData = {
    orderBy: PostFilterDataOrderBy,
    titleFilter: string
}

type Page = number;
type OnPage = number;

type PageFilter = {
    page: Page,
    onPage: OnPage,
}

interface AuthContextType {
    user: any;
    signIn: (user: any, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}
