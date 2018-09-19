// const modelsNamespace = 'org.example.mynetwork'

// function uuid() {
//     const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
//     return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
// }


// /**
// * A tag asset is created.
// * @param {org.example.mynetwork.tagCreation} tx - transaction to create a new tag asset
// * @transaction
// */
// async function createTag(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Tag')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Tag', assetId)

//     asset.valeur = tx.valeur
//     asset.creationDate = tx.creationDate
 
//     await registry.add(asset)
// }

// /**
// * A TreatedGas asset is created.
// * @param {org.example.mynetwork.treatedGasCreation} tx - transaction to create a new TreatedGas asset
// * @transaction
// */
// async function createTreatedGas(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.TreatedGas')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'TreatedGas', assetId)

//     asset.name = tx.name
//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
 
//     await registry.add(asset)
// }

// /**
// * A MovingPlace asset is created.
// * @param {org.example.mynetwork.movingPlaceCreation} tx - transaction to create a new MovingPlace asset
// * @transaction
// */
// async function createMovingPlace(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.MovingPlace')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'MovingPlace', assetId)

//     asset.isMobile = tx.isMobile
//     asset.creationDate = tx.creationDate
//     asset.type = tx.type
//     asset.capacity = tx.capacity
//     asset.description = tx.description
 
//     await registry.add(asset)
// }

/**
* A FixedPlace asset is created.
* @param {org.example.mynetwork.fixedPlaceCreation} tx - transaction to create a new FixedPlace asset
* @transaction
*/
// async function createFixedPlace(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.FixedPlace')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'FixedPlace', assetId)

//     asset.isMobile = tx.isMobile
//     asset.creationDate = tx.creationDate
//     asset.address = tx.address
//     asset.description = tx.description
 
//     await registry.add(asset)
// }

// /**
// * A Rule asset is created.
// * @param {org.example.mynetwork.ruleCreation} tx - transaction to create a new Rule asset
// * @transaction
// */
// async function createRule(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Rule')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Rule', assetId)

//     asset.name = tx.name
//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
//     asset.measureType = tx.measureType
//     asset.operator = tx.operator
//     asset.value = tx.value
 
//     await registry.add(asset)
// }

// /**
// * A Route asset is created.
// * @param {org.example.mynetwork.routeCreation} tx - transaction to create a new Route asset
// * @transaction
// */
// async function createRoute(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Route')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Route', assetId)

//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
 
//     await registry.add(asset)
// }

// /**
// * A MissionType asset is created.
// * @param {org.example.mynetwork.missionTypeCreation} tx - transaction to create a new MissionType asset
// * @transaction
// */
// async function createMissionType(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.MissionType')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'MissionType', assetId)

//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
 
//     await registry.add(asset)
// }

// /**
// * A Country asset is created.
// * @param {org.example.mynetwork.countryCreation} tx - transaction to create a new Country asset
// * @transaction
// */
// async function createCountry(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Country')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Country', assetId)

//     asset.name = tx.name
//     asset.creationDate = tx.creationDate
 
//     await registry.add(asset)
// }

// /**
// * A Product asset is created.
// * @param {org.example.mynetwork.productCreation} tx - transaction to create a new Product asset
// * @transaction
// */
// async function createProduct(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Product')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Product', assetId)

//     asset.label = tx.label
//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
//     asset.productProfile = tx.productProfile
 
//     await registry.add(asset)
// }


// /**
// * A Mission asset is created.
// * @param {org.example.mynetwork.missionCreation} tx - transaction to create a new Mission asset
// * @transaction
// */
// async function createMission(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Mission')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Mission', assetId)

//     asset.status = tx.status
//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
//     asset.missionType = tx.missionType
 
//     await registry.add(asset)
// }

// /**
// * A Attachment asset is created.
// * @param {org.example.mynetwork.attachmentCreation} tx - transaction to create a new Attachment asset
// * @transaction
// */
// async function createAttachment(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Attachment')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Attachment', assetId)

//     asset.name = tx.name
//     asset.path = tx.path
//     asset.creationDate = tx.creationDate
//     asset.package = tx.package
 
//     await registry.add(asset)
// }


// /**
// * A Storage asset is created.
// * @param {org.example.mynetwork.storageCreation} tx - transaction to create a new Storage asset
// * @transaction
// */
// async function createStorage(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Storage')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Storage', assetId)

//     asset.name = tx.startDate
//     asset.path = tx.endDate
//     asset.creationDate = tx.creationDate
//     asset.storageArea = tx.storageArea
//     asset.package = tx.package
 
//     await registry.add(asset)
// }

// /**
// * A Assignment asset is created.
// * @param {org.example.mynetwork.assignmentCreation} tx - transaction to create a new Assignment asset
// * @transaction
// */
// async function createAssignment(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Assignment')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Assignment', assetId)

//     asset.name = tx.name
//     asset.path = tx.path
//     asset.creationDate = tx.creationDate
//     asset.mission = tx.mission
//     asset.deliveryMan = tx.deliveryMan
//     asset.movingPlace = tx.movingPlace
 
//     await registry.add(asset)
// }

// /**
// * A PositionGPS asset is created.
// * @param {org.example.mynetwork.positionGPSCreation} tx - transaction to create a new PositionGPS asset
// * @transaction
// */
// async function createPositionGPS(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.PositionGPS')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'PositionGPS', assetId)

//     asset.type = tx.type
//     asset.creationDate = tx.creationDate
//     asset.latitude = tx.latitude
//     asset.longitude = tx.longitude    
 
//     await registry.add(asset)
// }

// /**
// * A TemperatureHumidity asset is created.
// * @param {org.example.mynetwork.temperatureHumidityCreation} tx - transaction to create a new TemperatureHumidity asset
// * @transaction
// */
// async function createTemperatureHumidity(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.TemperatureHumidity')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'TemperatureHumidity', assetId)

//     asset.type = tx.type
//     asset.creationDate = tx.creationDate
//     asset.temperature = tx.temperature
//     asset.humidity = tx.humidity    
 
//     await registry.add(asset)
// }


// /**
// * A Gas asset is created.
// * @param {org.example.mynetwork.gasCreation} tx - transaction to create a new Gas asset
// * @transaction
// */
// async function createGas(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Gas')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Gas', assetId)

//     asset.type = tx.type
//     asset.creationDate = tx.creationDate
//     asset.value = tx.value
//     asset.measuredGas = tx.measuredGas    
 
//     await registry.add(asset)
// }



// /**
// * A Standart asset is created.
// * @param {org.example.mynetwork.standartCreation} tx - transaction to create a new Standart asset
// * @transaction
// */
// async function createStandart(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Standart')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Standart', assetId)

//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
//     asset.country = tx.country
//     asset.rules = tx.rules    
 
//     await registry.add(asset)
// }

// /**
// * A ProductProfile asset is created.
// * @param {org.example.mynetwork.productProfileCreation} tx - transaction to create a new ProductProfile asset
// * @transaction
// */
// async function createProductProfile(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.ProductProfile')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'ProductProfile', assetId)

//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
//     asset.label = tx.label
//     asset.standarts = tx.standarts    
 
//     await registry.add(asset)
// }


// /**
// * A Package asset is created.
// * @param {org.example.mynetwork.packageCreation} tx - transaction to create a new Package asset
// * @transaction
// */
// async function createPackage(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Package')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Package', assetId)

//     asset.description = tx.description
//     asset.creationDate = tx.creationDate
//     asset.deliveryDate = tx.deliveryDate
//     asset.customer = tx.customer    
//     asset.provider = tx.provider    
//     asset.tag = tx.tag
//     asset.attachments = tx.attachments
//     asset.products = tx.products    
 
//     await registry.add(asset)
// }


// /**
// * A Alert asset is created.
// * @param {org.example.mynetwork.alertCreation} tx - transaction to create a new Alert asset
// * @transaction
// */
// async function createAlert(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Alert')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Alert', assetId)

//     asset.description = tx.description
//     asset.type = tx.type
//     asset.status = tx.status
//     asset.creationDate = tx.creationDate    
//     asset.users = tx.users    
//     asset.package = tx.package

//     await registry.add(asset)
// }

// /**
// * A DeliveryRoute asset is created.
// * @param {org.example.mynetwork.deliveryRouteCreation} tx - transaction to create a new DeliveryRoute asset
// * @transaction
// */
// async function createDeliveryRoute(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.DeliveryRoute')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'DeliveryRoute', assetId)

//     asset.movingPlace = tx.movingPlace
//     asset.routes = tx.routes
//     asset.creationDate = tx.creationDate    
    
//     await registry.add(asset)
// }


// /**
// * A Acquisition asset is created.
// * @param {org.example.mynetwork.acquisitionCreation} tx - transaction to create a new Acquisition asset
// * @transaction
// */
// async function createAcquisition(tx)
// {
// 	const registry = await getAssetRegistry(modelsNamespace + '.Acquisition')
// 	const factory = getFactory()
//     const assetId = uuid()
//     const asset = factory.newResource(modelsNamespace, 'Acquisition', assetId)

//     asset.movingPlace = tx.movingPlace
//     asset.storageArea = tx.storageArea
//     asset.tags = tx.tags
//     asset.measures = tx.measures    
    
//     await registry.add(asset)
// }








