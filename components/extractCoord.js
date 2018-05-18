var polyline = require('@mapbox/polyline')

module.exports = {    
    extractLine: function (overview) {
        return polyline.decode(overview.points).map(point => {
            return {
                latitude: point[0],
                longitude: point[1]
            }
        })
    }
}