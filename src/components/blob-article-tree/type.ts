export declare type I_ArticleTreeItem =
	| {
			level: 1;
			title: string;
			children?: I_ArticleTreeItem[];
	  }
	| {
			level: 2;
			title: string;
			children?: I_ArticleTreeItem[];
	  }
	| {
			id: number;
			level: 3;
			title: string;
			children?: I_ArticleTreeItem[];
	  };

export declare interface I_ArticleClickObj {
	article: I_ArticleTreeItem;
}
