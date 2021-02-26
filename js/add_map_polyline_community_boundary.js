// https://coderoad.ru/5112867/%D0%9F%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D0%B7%D0%BA%D0%B0-%D0%BF%D0%BE-%D0%BF%D0%BE%D0%BB%D0%B8%D0%BB%D0%B8%D0%BD%D0%B8%D0%B8-Google-maps-v3

let polyline_arr = [];

// Додає на карту межі
function add_map_polyline_community_boundary(arr, stroke_сolor, name_polyline, message_text) {
    let flight_plan_coordinates = [];

    for (let i = 0; i < arr.length; i++) {
        flight_plan_coordinates.push({
            lat: Number(arr[i].community_boundary_latitude),
            lng: Number(arr[i].community_boundary_longitude),
        });
    }
    //console.log(flight_plan_coordinates)

    window[name_polyline] = new google.maps.Polyline({
        path: flight_plan_coordinates,
        geodesic: true,
        draggable: false,
        editable: false,
        strokeColor: stroke_сolor,
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: map,
    });
    window[name_polyline].setMap(map);
    polyline_arr.push(window[name_polyline]);

    const content_infoWindow = `<div style="font-size: 15px">${message_text}</div>`;
    //var infoWindow = new google.maps.InfoWindow({content:contentString});

    let infoWindow = new google.maps.InfoWindow();

    // Відкриває InfoWindow при наведенні курсора миші
    google.maps.event.addListener(window[name_polyline], "mouseover", function (e) {
        infoWindow.setPosition(e.latLng);
        infoWindow.setContent(content_infoWindow);
        infoWindow.open(map);
    });

    // Закриває InfoWindow
    google.maps.event.addListener(window[name_polyline], "mouseout", function () {
        infoWindow.close();
    });
}

// Показує межі усіх населених пунктів
function add_map_polyline_community_boundary_all() {
    if (polyline_arr.length) {
        // Видаляє межі усіх населених пунктів
        for (let i = 0; i < polyline_arr.length; i++) {
            polyline_arr[i].setMap(null);
        }
        polyline_arr = [];
        return;
    }
    // Додає на карту межі Ладижинської територіальної громади
    add_map_polyline_community_boundary(data_community_boundary_arr, "#FF0000", "poly_community_boundary", "Межа Ладижинської територіальної громади");

    // Додає на карту межі Заозерного
    add_map_polyline_community_boundary(data_community_boundary_zaozerne_arr, "#ffe100", "poly_zaozerne", "Межа c.Заозерне");

    // Додає на карту межі Василівки
    add_map_polyline_community_boundary(data_community_boundary_vasylivka_arr, "#ffe100", "poly_vasylivka", "Межа c.Василівка");

    // Додає на карту межі Лукашівки
    add_map_polyline_community_boundary(data_community_boundary_lukashivka_arr, "#ffe100", "poly_lukashivka", "Межа c.Лукашівка");

    // Додає на карту межі Губника
    add_map_polyline_community_boundary(data_community_boundary_hubnyk_arr, "#ffe100", "poly_hubnyk", "Межа с-ще Губник");

    // Додає на карту межі Ружицького
    add_map_polyline_community_boundary(data_community_boundary_ruzhytske_arr, "#ffe100", "poly_ruzhytske", "Межа с-ще Ружицьке");

    // Додає на карту межі Ладижина
    add_map_polyline_community_boundary(data_community_boundary_ladyzhyn_arr, "#ffe100", "poly_ladyzhyn", "Межа м.Ладижин");

    // Після додавання меж громади маштабує карту
    map_offset_community_boundary();
}