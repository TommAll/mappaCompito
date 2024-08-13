window.onload = async()=>
{
    let mappa=document.getElementById("map"); 
    let comuni;
    let dati;



    let promise = await fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni?format=json&onlyname=true");
    dati=await promise.json()
    comuni=estraiComuni(dati);
    console.log(comuni); 

    let coord = [parseFloat("12.4963655"), parseFloat("41.9027835")];

    var map = new ol.Map({
        //target: ID html del contenitore della mappa
        target: 'map',
        //livelli/strati sovrapposti sulla mappa
        layers: [
            //Primo livello -> mappa base
            new ol.layer.Tile({
                //Tipo della mappa 
                source: new ol.source.OSM()
            })
        ],
        //Rappresentazione dei layers e loro configurazione
        view: new ol.View({
            //coordinate del punto centrale della mappa
            center: ol.proj.fromLonLat(coord),
            //zoom della mappa
            zoom: 5
        })
    });

    const marker=new ol.layer.Vector({
        source: new ol.source.Vector({
            features:[
                new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat([12.4963655,41.9027835])
                    )
                })
            ]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src:'icona (1).png'
            })
        })
    })
    map.addLayer(marker)


    
    
}

function estraiComuni(dati)
{
    let ris=[];
    let num=0; 

    for(let i=0;i<15;i++)
    {
        num=Math.floor(Math.random()*((dati.length-1)-0)+0)

        if(i==0)
        {
            ris.push(dati[num])
        }else if(controlla(dati[num],ris))
        {
            ris.push(dati[num])
        }
    }
    return ris;
}

function controlla(com,vet)
{
    for(let i=0;i<vet.length;i++)
    {
        if(vet[i]==com)
        {
            return false;
        }
    }
    return true;
}