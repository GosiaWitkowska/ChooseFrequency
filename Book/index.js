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
        clientId: "263e801694324c18a963abd1af19b672"
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://drive.google.com/file/d/1nZCbk7jdhwYbTsO0NRHB5DS3EVX_yqw9/view?usp=share_link",
                
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
