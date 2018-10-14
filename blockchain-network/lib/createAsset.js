const modelsNamespace = 'org.example.mynetwork'

function uuid() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}






 /**
 * A Gas asset is created.
 * @param {org.example.mynetwork.createGas} tx - transaction to create a new Gas asset
 * @transaction
 */
 async function createGas(tx)
 {
 	const registry = await getAssetRegistry(modelsNamespace + '.Gas')
 	const factory = getFactory()
     const assetId = uuid()
     const asset = factory.newResource(modelsNamespace, 'Gas', assetId)

     asset.measureId = assetId
     asset.type = tx.type
     asset.creationDate = tx.creationDate
     asset.value = tx.value
     asset.name = tx.name
     asset.description = tx.description
     asset.unit = tx.unit
   	 asset.packages = tx.packages
 
     return await registry.add(asset)
}



 /**
 * A TemperatureHumidity asset is created.
 * @param {org.example.mynetwork.createTemperatureHumidity} tx - transaction to create a new TemperatureHumidity asset
 * @transaction
 */
 async function createTemperatureHumidity(tx)
 {
 	const registry = await getAssetRegistry(modelsNamespace + '.TemperatureHumidity')
 	const factory = getFactory()
     const assetId = uuid()
     const asset = factory.newResource(modelsNamespace, 'TemperatureHumidity', assetId)

     asset.measureId = assetId
     asset.type = tx.type
     asset.creationDate = tx.creationDate
     asset.temperature = tx.temperature
     asset.humidity = tx.humidity    
     asset.temperatureUnit = tx.temperatureUnit
     asset.humidityUnit = tx.humidityUnit
 
     return await registry.add(asset)
 }


 /**
 * A Acquisition asset is created.
 * @param {org.example.mynetwork.createAcquisition} tx - transaction to create a new Acquisition asset
 * @transaction
 */
async function createAcquisition(tx)
{
    const registry = await getAssetRegistry(modelsNamespace + '.Acquisition')
    const factory = getFactory()
    const assetId = uuid()
    const asset = factory.newResource(modelsNamespace, 'Acquisition', assetId)

    asset.storageArea = tx.storageArea
    asset.tags = tx.tags

    var measures = []
    if(tx.measures){
      for(var i=0; i<tx.measures.length; i++){
          var measure = null
          if(tx.measures[i].type==="gas"){
              tx.measures[i].$class = "org.example.mynetwork.Gas"
              measure = await createGas(tx.measures[i])
          } else {
              tx.measures[i].$class = "org.example.mynetwork.TemperatureHumidity"
              measure =  await createTemperatureHumidity(tx.measures[i])
          }
          if(measure){
              measures.push(measure)
          }
      }
    }

    asset.measures = measures

   
    await registry.add(asset)
}

