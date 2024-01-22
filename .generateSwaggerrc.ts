export default {
	// 远程swagger.json文件URL
	swaggerUrl: 'http://192.168.13.21:3000/swagger.json',
	// 生成的swagger.json文件路径，默认src/apiType/swagger.json
	swaggerFileName: 'src/apiType/production/swagger.json',
	// 生成的接口文件路径，默认src/apiType/api.ts
	resultFileName: 'src/apiType/production/result.ts',
	// 生成文件中的Typescript类型命名前缀，默认AT_
	interfaceNamePrepend: 'AT_',
	// 封装的axios实例引入路径，默认import axios from '@/request/index'
	axiosUrl: "import axios from '@/request/index';",
	isNeedResponse: false,
};
