import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Property, Location } from './app.models';
import { AppSettings } from './app.settings';

export class Data {
  constructor(public properties: Property[],
              public compareList: Property[],
              public favorites: Property[],
              public locations: Location[]) { }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public Data = new Data(
    [], // properties
    [], // compareList
    [], // favorites
    []  // locations
  )
  public url = "assets/data/";
  public apiKey = 'AIzaSyA1rF9bttCxRmsNdZYjW7FzIoyrul5jb-s';
  
  constructor(public http:HttpClient, 
              private bottomSheet: MatBottomSheet, 
              private snackBar: MatSnackBar,
              public appSettings:AppSettings) { }
    
  public getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'properties.json');
  }

  public getPropertyById(id): Observable<Property>{
    return this.http.get<Property>(this.url + 'property-' + id + '.json');
  }

  public getFeaturedProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'featured-properties.json');
  } 

  public getRelatedProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'related-properties.json');
  }

  public getPropertiesByAgentId(agentId): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'properties-agentid-' + agentId + '.json');
  }

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.url + 'locations.json');
  }

  public getAddress(lat = 40.714224, lng = -73.961452){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey);
  }

  public getLatLng(address){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+this.apiKey+'&address='+address);
  }

  public getFullAddress(lat = 40.714224, lng = -73.961452){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey).subscribe(data =>{ 
      return data['results'][0]['formatted_address'];
    });
  }

  public addToCompare(property:Property, component, direction){ 
    if(!this.Data.compareList.filter(item=>item.id == property.id)[0]){
      this.Data.compareList.push(property);
      this.bottomSheet.open(component, {
        direction: direction
      }).afterDismissed().subscribe(isRedirect=>{  
        if(isRedirect){
          window.scrollTo(0,0);
        }        
      }); 
    } 
  }

  public addToFavorites(property:Property, direction){
    if(!this.Data.favorites.filter(item=>item.id == property.id)[0]){
      this.Data.favorites.push(property);
      this.snackBar.open('The property "' + property.title + '" has been added to favorites.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction 
      });  
    }    
  }

  public getPropertyTypes(){
    return [ 
      { id: 1, name: 'Office' },
      { id: 2, name: 'House' },
      { id: 3, name: 'Apartment' }
    ]
  }

  public getPropertyStatuses(){
    return [ 
      { id: 1, name: 'For Sale' },
      { id: 2, name: 'For Rent' },
      { id: 3, name: 'Open House' },
      { id: 4, name: 'No Fees' },
      { id: 5, name: 'Hot Offer' },
      { id: 6, name: 'Sold' }
    ]
  }

  public getCities(){
    return [ 
      { id: 1, name: 'New York' },
      { id: 2, name: 'Chicago' },
      { id: 3, name: 'Los Angeles' },
      { id: 4, name: 'Seattle' } 
    ]
  }

  public getNeighborhoods(){
    return [      
      { id: 1, name: 'Astoria', cityId: 1 },
      { id: 2, name: 'Midtown', cityId: 1 },
      { id: 3, name: 'Chinatown', cityId: 1 }, 
      { id: 4, name: 'Austin', cityId: 2 },
      { id: 5, name: 'Englewood', cityId: 2 },
      { id: 6, name: 'Riverdale', cityId: 2 },      
      { id: 7, name: 'Hollywood', cityId: 3 },
      { id: 8, name: 'Sherman Oaks', cityId: 3 },
      { id: 9, name: 'Highland Park', cityId: 3 },
      { id: 10, name: 'Belltown', cityId: 4 },
      { id: 11, name: 'Queen Anne', cityId: 4 },
      { id: 12, name: 'Green Lake', cityId: 4 }      
    ]
  }

  public getStreets(){
    return [      
      { id: 1, name: 'Astoria Street #1', cityId: 1, neighborhoodId: 1},
      { id: 2, name: 'Astoria Street #2', cityId: 1, neighborhoodId: 1},
      { id: 3, name: 'Midtown Street #1', cityId: 1, neighborhoodId: 2 },
      { id: 4, name: 'Midtown Street #2', cityId: 1, neighborhoodId: 2 },
      { id: 5, name: 'Chinatown Street #1', cityId: 1, neighborhoodId: 3 }, 
      { id: 6, name: 'Chinatown Street #2', cityId: 1, neighborhoodId: 3 },
      { id: 7, name: 'Austin Street #1', cityId: 2, neighborhoodId: 4 },
      { id: 8, name: 'Austin Street #2', cityId: 2, neighborhoodId: 4 },
      { id: 9, name: 'Englewood Street #1', cityId: 2, neighborhoodId: 5 },
      { id: 10, name: 'Englewood Street #2', cityId: 2, neighborhoodId: 5 },
      { id: 11, name: 'Riverdale Street #1', cityId: 2, neighborhoodId: 6 }, 
      { id: 12, name: 'Riverdale Street #2', cityId: 2, neighborhoodId: 6 },
      { id: 13, name: 'Hollywood Street #1', cityId: 3, neighborhoodId: 7 },
      { id: 14, name: 'Hollywood Street #2', cityId: 3, neighborhoodId: 7 },
      { id: 15, name: 'Sherman Oaks Street #1', cityId: 3, neighborhoodId: 8 },
      { id: 16, name: 'Sherman Oaks Street #2', cityId: 3, neighborhoodId: 8 },
      { id: 17, name: 'Highland Park Street #1', cityId: 3, neighborhoodId: 9 },
      { id: 18, name: 'Highland Park Street #2', cityId: 3, neighborhoodId: 9 },
      { id: 19, name: 'Belltown Street #1', cityId: 4, neighborhoodId: 10 },
      { id: 20, name: 'Belltown Street #2', cityId: 4, neighborhoodId: 10 },
      { id: 21, name: 'Queen Anne Street #1', cityId: 4, neighborhoodId: 11 },
      { id: 22, name: 'Queen Anne Street #2', cityId: 4, neighborhoodId: 11 },
      { id: 23, name: 'Green Lake Street #1', cityId: 4, neighborhoodId: 12 },
      { id: 24, name: 'Green Lake Street #2', cityId: 4, neighborhoodId: 12 }      
    ]
  }

  public getFeatures(){
    return [ 
      { id: 1, name: 'Air Conditioning', selected: false },
      { id: 2, name: 'Barbeque', selected: false },
      { id: 3, name: 'Dryer', selected: false },
      { id: 4, name: 'Microwave', selected: false }, 
      { id: 5, name: 'Refrigerator', selected: false },
      { id: 6, name: 'TV Cable', selected: false },
      { id: 7, name: 'Sauna', selected: false },
      { id: 8, name: 'WiFi', selected: false },
      { id: 9, name: 'Fireplace', selected: false },
      { id: 10, name: 'Swimming Pool', selected: false },
      { id: 11, name: 'Gym', selected: false },
    ]
  }


  public getHomeCarouselSlides(){
    return this.http.get<any[]>(this.url + 'slides.json');
  }


  public filterData(data, params: any, sort?, page?, perPage?){ 
   
    if(params){

      if(params.propertyType){
        data = data.filter(property => property.propertyType == params.propertyType.name)
      }

      if(params.propertyStatus && params.propertyStatus.length){       
        let statuses = [];
        params.propertyStatus.forEach(status => { statuses.push(status.name) });           
        let properties = [];
        data.filter(property =>
          property.propertyStatus.forEach(status => {             
            if(statuses.indexOf(status) > -1){                 
              if(!properties.includes(property)){
                properties.push(property);
              }                
            }
          })
        );
        data = properties;
      }

      if(params.price){
        if(this.appSettings.settings.currency == 'USD'){          
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale >= params.price.from ){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent >= params.price.from ){
                return true;
              } 
              return false;
            });
          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale <= params.price.to){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent <= params.price.to){
                return true;
              } 
              return false;
            });          
          }
        }
        if(this.appSettings.settings.currency == 'EUR'){
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale >= params.price.from ){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent >= params.price.from ){
                return true;
              } 
              return false;
            });

          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale <= params.price.to){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent <= params.price.to){
                return true;
              } 
              return false;
            });
          }
        }        
      }  

      if(params.city){
        data = data.filter(property => property.city == params.city.name)
      }

      if(params.zipCode){
        data = data.filter(property => property.zipCode == params.zipCode)
      }
      
      if(params.neighborhood && params.neighborhood.length){       
        let neighborhoods = [];
        params.neighborhood.forEach(item => { neighborhoods.push(item.name) });           
        let properties = [];
        data.filter(property =>
          property.neighborhood.forEach(item => {             
            if(neighborhoods.indexOf(item) > -1){                 
              if(!properties.includes(property)){
                properties.push(property);
              }                
            }
          })
        );
        data = properties;
      }

      if(params.street && params.street.length){       
        let streets = [];
        params.street.forEach(item => { streets.push(item.name) });           
        let properties = [];
        data.filter(property =>
          property.street.forEach(item => {             
            if(streets.indexOf(item) > -1){                 
              if(!properties.includes(property)){
                properties.push(property);
              }                
            }
          })
        );
        data = properties;
      }

      if(params.bedrooms){
        if(params.bedrooms.from){
          data = data.filter(property => property.bedrooms >= params.bedrooms.from)
        }
        if(params.bedrooms.to){
          data = data.filter(property => property.bedrooms <= params.bedrooms.to)
        }
      } 
      
      if(params.bathrooms){
        if(params.bathrooms.from){
          data = data.filter(property => property.bathrooms >= params.bathrooms.from)
        }
        if(params.bathrooms.to){
          data = data.filter(property => property.bathrooms <= params.bathrooms.to)
        }
      } 

      if(params.garages){
        if(params.garages.from){
          data = data.filter(property => property.garages >= params.garages.from)
        }
        if(params.garages.to){
          data = data.filter(property => property.garages <= params.garages.to)
        }
      } 

      if(params.area){
        if(params.area.from){
          data = data.filter(property => property.area.value >= params.area.from)
        }
        if(params.area.to){
          data = data.filter(property => property.area.value <= params.area.to)
        }
      } 

      if(params.yearBuilt){
        if(params.yearBuilt.from){
          data = data.filter(property => property.yearBuilt >= params.yearBuilt.from)
        }
        if(params.yearBuilt.to){
          data = data.filter(property => property.yearBuilt <= params.yearBuilt.to)
        }
      }

      if(params.features){       
        let arr = [];
        params.features.forEach(feature => { 
          if(feature.selected)
            arr.push(feature.name);
        });  
        if(arr.length > 0){
          let properties = [];
          data.filter(property =>
            property.features.forEach(feature => {             
              if(arr.indexOf(feature) > -1){                 
                if(!properties.includes(property)){
                  properties.push(property);
                }                
              }
            })
          );
          data = properties;
        }         
        
      }
      
    }

    // console.log(data)

    //for show more properties mock data 
    for (var index = 0; index < 2; index++) {
      data = data.concat(data);        
    }     
     
    this.sortData(sort, data);
    return this.paginator(data, page, perPage)
  }

  public sortData(sort, data){
    if(sort){
      switch (sort) {
        case 'Newest':
          data = data.sort((a, b)=> {return <any>new Date(b.published) - <any>new Date(a.published)});           
          break;
        case 'Oldest':
          data = data.sort((a, b)=> {return <any>new Date(a.published) - <any>new Date(b.published)});           
          break;
        case 'Popular':
          data = data.sort((a, b) => { 
            if(a.ratingsValue/a.ratingsCount < b.ratingsValue/b.ratingsCount){
              return 1;
            }
            if(a.ratingsValue/a.ratingsCount > b.ratingsValue/b.ratingsCount){
              return -1;
            }
            return 0; 
          });
          break;
        case 'Price (Low to High)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        case 'Price (High to Low)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items, page?, perPage?) { 
    var page = page || 1,
    perPage = perPage || 4,
    offset = (page - 1) * perPage,   
    paginatedItems = items.slice(offset).slice(0, perPage),
    totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination:{
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }



  public getTestimonials(){
    return [
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Mr. Adam Sandler', 
            position: 'General Director', 
            image: 'assets/images/profile/adam.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Ashley Ahlberg', 
            position: 'Housewife', 
            image: 'assets/images/profile/ashley.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Bruno Vespa', 
            position: 'Blogger', 
            image: 'assets/images/profile/bruno.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Mrs. Julia Aniston', 
            position: 'Marketing Manager', 
            image: 'assets/images/profile/julia.jpg' 
        }
    ];
  }

  public getAgents(){
    return [        
        { 
            id: 1,
            fullName: 'Noa Lev',
            desc: 'Member of company: HouseKey.',            
            organization: 'HouseKey',
            email: 'noa.lev@HouseKey.com',
            phone: '054-3488462',
            social: {
              //facebook: 'lusia',
              //twitter: 'lusia',
              //linkedin: 'lusia',
              //instagram: 'lusia',
              //website: 'https://lusia.manuel.com'
            },
            //ratingsCount: 6,
            //ratingsValue: 480,
            image: 'assets/images/agents/noa.jpg' 
        },
        { 
            id: 2,
            fullName: 'Aviya Malka',
            desc: 'Member of company: HouseKey.',            
            organization: 'HouseKey',
            email: 'aviya.malka@housekey.com',
            phone: '058-7474641',
            social: {
              //facebook: '',
              //twitter: '',
              //linkedin: '',
              //instagram: '',
              //website: 'https://andy.warhol.com'
            },
            //ratingsCount: 4,
            //ratingsValue: 400,
            image: 'assets/images/agents/aviya.jpg' 
        },        
        { 
            id: 3,
            fullName: 'Chani Diamant',
            desc: 'Member of company: HouseKey.',            
            organization: 'HouseKey',
            email: 'chani.diamant@housekey.com',
            phone: '052-6971305',
            social: {
              //facebook: '',
              //twitter: '',
              //linkedin: '',
              //instagram: '',
              website: 'https://tereza.stiles.com'
            },
            //ratingsCount: 4,
            //ratingsValue: 380,
            image: 'assets/images/agents/chani.jpg' 
        },
        { 
          id: 4,
          fullName: 'Tehila Rashkes',
          desc: 'Member of company: HouseKey.',            
          organization: 'HouseKey',
          email: 'tehila.rashkes@housekey.com',
          phone: '054-5856054',
          social: {
            //facebook: '',
            //twitter: '',
            //linkedin: '',
            //instagram: '',
            website: 'https://michael.blair.com'
          },
          //ratingsCount: 6,
          //ratingsValue: 480,
          image: 'assets/images/agents/tehila.jpg'  
        },
        { 
            id: 5,
            fullName: 'Hadar Bruchim',
            desc: 'Member of company: HouseKey.',            
            organization: 'HouseKey',
            email: 'hadar.bruchim@housekey.com',
            phone: '053-3367444',
            social: {
              //facebook: '',
              //twitter: '',
              //linkedin: '',
              //instagram: '',
              website: 'https://michelle.ormond.com'
            },
            //ratingsCount: 6,
            //ratingsValue: 480, 
            image: 'assets/images/agents/hadar.jpg' 
        }
    ];
  }



  public getClients(){
    return [  
        { name: 'aloha', image: 'assets/images/clients/aloha.png' },
        { name: 'dream', image: 'assets/images/clients/dream.png' },  
        { name: 'congrats', image: 'assets/images/clients/congrats.png' },
        { name: 'best', image: 'assets/images/clients/best.png' },
        { name: 'original', image: 'assets/images/clients/original.png' },
        { name: 'retro', image: 'assets/images/clients/retro.png' },
        { name: 'king', image: 'assets/images/clients/king.png' },
        { name: 'love', image: 'assets/images/clients/love.png' },
        { name: 'the', image: 'assets/images/clients/the.png' },
        { name: 'easter', image: 'assets/images/clients/easter.png' },
        { name: 'with', image: 'assets/images/clients/with.png' },
        { name: 'special', image: 'assets/images/clients/special.png' },
        { name: 'bravo', image: 'assets/images/clients/bravo.png' }
    ];
  }


}
