window.onload = async()=>
{
    let mappa=document.getElementById("map"); 
    let comuni;
    let dati;

    let promise = await fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni?format=json&onlyname=true");
    dati=await promise.json()
    comuni=estraiComuni(dati);
    console.log(comuni); 

    
    
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