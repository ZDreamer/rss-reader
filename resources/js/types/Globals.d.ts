declare module "*.module.css";
declare module "*.module.scss";

type PostData = {
    userId?: number,
    id: number,
    title: string
    body: string,
}

type PostDataList = Array<PostData>;

type PostFilterData = {
    orderBy: string,
    titleFilter: string
}

type Page = number;
type OnPage = number;

type PageFilter = {
    page: Page,
    onPage: OnPage,
}
