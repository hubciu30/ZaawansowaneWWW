class Home{
    constructor(api){
        this.uri = api;
    }

    getCategories = async () =>{
        const data = await fetch(this.uri, {
            method: "GET",
            credentials: "same-origin"
        });
        if(data.status === 200){
            return data.json();
        }
        else{
            return [];
        }
    }

    convertMilisecondsToDate = (ms) => {
        ms = parseInt(ms);
        return new Date(ms).toLocaleString().split(', '); //[dd.mm.yyyy, hh:mm:ss]
    }

    loadPage = async () =>{
        // pobierz dane z serwera : jeżeli nie -> wyświetl błąd
        const data = await this.getCategories();
        // wypisz dane : jeśli nie -> wyświetl że nic nie ma
        console.log(data);
        if(data.length > 0){
            let table = document.getElementById("table-body");
            for(let item of data){
                let tr = document.createElement('tr');
                tr.classList.add('table-tr');
                let create_time = this.convertMilisecondsToDate(item.create_time);
                let last_post_time = this.convertMilisecondsToDate(item.last_post_time);
                let tr_body_str = `<td>${item.name}</td>
                <td>${create_time[0]}</td>
                <td>${last_post_time[1]+" "+last_post_time[0]}</td>
                <td>${item.topics_count}</td>
                <td><button class="table-action-button" onclick="window.open('${"/api/categories/"+ item.id}')" type="button">Przejdź</button></td>`;
                tr.innerHTML = tr_body_str;
                table.appendChild(tr);
            }
        }
        else{
            document.getElementById("container").innerHTML = "<h1>Brak kategorii</h1>"
        }
    }
}



window.onload = ()=>{
    const home = new Home("/api/categories");
    home.loadPage();
};