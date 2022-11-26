/* Pass the embed mode option here */
const viewerConfig = {
    embedMode: "LIGHT_BOX"
};

/* Wait for Adobe Document Services PDF Embed API to be ready and enable the View PDF button */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    document.getElementById("view-pdf-btn").disabled = false;
});

/* Function to render the file using PDF Embed API. */
function previewFile()
{

    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "5ace8d864bf548a49dbb1e1732f5692b"
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://choosefrequency.com/FightingCodependency.pdf",
                
                //If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "access-control-allow-headers",
                        value: "access-control-allow-origin",
                    },
					{
                        key: "access-control-allow-methods",
                        value: "OPTIONS, HEAD, DELETE, POST, GET",
                    },
										{
                        key: "access-control-allow-origin",
                        value: "*",
                    }
                ]
                
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "FightingCodependency.pdf"
        }
    }, viewerConfig);
};
