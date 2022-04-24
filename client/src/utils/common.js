export const validator = () => {

}


String.prototype.cloudinaryDownloadFormat = function() {
    return this.replace("/upload", "/upload/fl_attachment/")
}