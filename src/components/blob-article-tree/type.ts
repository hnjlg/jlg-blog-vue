export declare interface I_ArticleTreeItem {
	id?: number;
	level: 1 | 2 | 3;
	title: string;
	children?: I_ArticleTreeItem[];
}

export declare interface I_ArticleClickObj {
	articleCld: I_ArticleTreeItem;
	article: I_ArticleTreeItem;
}
