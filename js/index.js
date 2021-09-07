const arrays = []
const run = async(url) => {
    try{
        const response = await $.get(url);
        const results = response.results;
        const ul = $('<ul>').css({width: '40%', margin: '0 auto'});
        if(arrays.length > 0){
            arrays.splice(0, 2);
            arrays.push(response.previous, response.next)
        }else{
            arrays.push(response.previous, response.next)
        }

        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }


        const promises = results.map(e => {
            e.name = e.name.capitalize();
            const nameList = $('<li>').append(e.name).css({paddingTop: '10px', border: '1px solid'});
            ul.append(nameList);
            return $.get(e.url);

        });

        $('.data').html(ul);

        $('li').on('click', function (){
            if($(this).find($('.list-information') !== 0)){
                $(this).find($('.list-information')).toggle();
            }
            for (let i = 0; i < promises.length; i++){
                const result = promises[i].responseJSON;
                if($(this).text().toLowerCase() === result.name){
                    const ul2 = $('<ul>').addClass('list-information');

                    const value = {
                        'Фото ' : result.sprites.front_default,
                        'Имя: ' : result.name,
                        'Типы: ' :result.types,
                        'Рост: ' : result.height,
                        'Вес: ' : result.weight,
                    }

                    for(const key in value){

                        if (key === 'Фото '){
                            const img = $('<img>').attr('src', value[key]).css({width: '50px', height: '50px'});
                            const divImg = $('<li>').append(img)
                            ul2.append(divImg);
                            continue;
                        }else if (key === 'Типы: '){
                            const val = value[key]
                            for(let i = 0; i < value[key].length; i++) {
                                const type = 'Типы: ' + val[i].type.name
                                const listTypes = $('<li>').text(type)
                                ul2.append(listTypes)
                            };
                            continue;
                        }
                        const listData = $('<li>').text(key + value[key]);
                        ul2.append(listData);
                    }
                    $(this).append(ul2);
                } else {
                    continue;
                }
            }
        })

    }catch(e) {
        console.log('error', e)
    }
};