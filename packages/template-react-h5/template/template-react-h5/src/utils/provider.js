export function getProviderViewModels() {
    const tiandiKey = "****";       // 天地图key，官网申请
    const baseUrl = 'http://t{s}.tianditu.com';
    // 天地图矢量
    const tiandiVec = new Cesium.UrlTemplateImageryProvider({
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        url: baseUrl + '/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + tiandiKey
    });
    // 天地图影像
    const tiandiImg = new Cesium.UrlTemplateImageryProvider({
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        url: baseUrl + '/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + tiandiKey
    });
    // 天地图标注
    const tiandiCva = new Cesium.UrlTemplateImageryProvider({
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        url: baseUrl + '/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + tiandiKey
    });

    const tiandiVecModel = new Cesium.ProviderViewModel({
        name: '天地图',
        category: '国内地图资源',
        iconUrl: Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/openStreetMap.png'),
        tooltip: 'WMTS 地图服务',
        creationFunction: function () {
            return [tiandiVec, tiandiCva];
        }
    });
    const tiandiImgModel = new Cesium.ProviderViewModel({
        name: '天地图影像',
        category: '国内地图资源',
        iconUrl: Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/esriWorldImagery.png'),
        tooltip: 'WMTS 影像服务',
        creationFunction: function () {
            return [tiandiImg, tiandiCva];
        }
    });

    return [tiandiVecModel, tiandiImgModel]
}