import { h, render } from 'vue';
import DrawerFrame from '@/components/drawer-frame/index.vue';
import ArticlePublish from '@/components/business/article-publish/index.vue';
import MyInformation from '@/components/business/my-information/index.vue';
import { DrawerProps } from 'element-plus';
const divDom = document.createElement('div');
document.body.appendChild(divDom);

const DrawerList = new Map(
	Object.entries({
		ArticlePublish: ArticlePublish,
		MyInformation: MyInformation,
	})
);

type T_DrawerType = 'add' | 'edit' | 'view';
function drawer<Option = object>(
	drawerKey: string,
	drawerTitle: string,
	option: Option,
	drawerType: T_DrawerType,
	drawerDirection?: string,
	drawerSize?: string,
	drawerParams?: DrawerProps
) {
	return new Promise((resolve, reject) => {
		function onSubmit<T = object>(data: T) {
			render(null, divDom);
			resolve(data);
		}

		function onCancel() {
			render(null, divDom);
			reject(new Error('取消'));
		}

		/* 
			h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”。
				这个名字来源于许多虚拟 DOM 实现默认形成的约定。一个更准确的名称应该是 createVnode()，
				但当你需要多次使用渲染函数时，一个简短的名字会更省力。
			h(type,props,children) 用于 创建虚拟 DOM 节点 (vnode)。
			第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。
			第二个参数是要传递的 prop，
			第三个参数是子节点。
    	*/
		const vNode = h(
			DrawerFrame,
			{
				drawerKey,
				drawerTitle,
				drawerDirection,
				drawerSize,
				...drawerParams,
				propsData: { drawerType, ...option },
				// 打开弹窗
				modelValue: true,
				// 提交
				onSubmit,
				// 取消
				onCancel,
				// 关闭
				onClose: onCancel,
			},
			{
				default: () =>
					h(DrawerList.get(drawerKey) ?? 'div', {
						propsData: { drawerType, ...option },
						// 提交
						onSubmit,
						// 取消
						onCancel,
						// 关闭
						onClose: onCancel,
					}),
			}
		);

		/* 
			用于编程式地创建组件虚拟 DOM 树的函数。
			render 是字符串模板的一种替代，可以使你利用 JavaScript 的丰富表达力来完全编程式地声明组件最终的渲染输出。
			预编译的模板，例如单文件组件中的模板，会在构建时被编译为 render 选项。
			如果一个组件中同时存在 render 和 template，则 render 将具有更高的优先级。
		*/
		render(vNode, divDom);
	});
}
export default drawer;
