module.exports = {
    extractCoord: function (obj,start,end) {
        console.log("starting", obj.length)
        tempArr = []
        obj.forEach(val => {
            tempArr.push({latitude: val.start_location.lat, longitude: val.start_location.lng}, {latitude: val.end_location.lat, longitude: val.end_location.lng})
        })

        if (tempArr[0].latitude !== start.latitude || tempArr[0].longitude !== start.longitude) tempArr.unshift(start)
        if (tempArr[tempArr.length-1].latitude !== end.latitude || tempArr[tempArr.length-1].longitude !== end.longitude) tempArr.push(end)
        console.log("ending", tempArr)
            return tempArr    
        }
}