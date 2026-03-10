import {useState ,useEffect} from "react"
import {View ,StyleSheet,Pressable,Text} from "react-native"
import MapView,{Marker} from "react-native-maps"
import * as Location from "expo-location"

export default function Index(){
  const [hospitals,setHospitals]=useState<any[]>([])
  const [location,setLocation]=useState<any>(null)
  const [showModal,setShowModal]=useState(false)
  const apiKey="0f791c70d39e4167bb96468f2a8b3476"

  useEffect(()=>{
    getLocation()
  },[])

  const sendSOS=async()=>{
    try{
      console.log("umm")
      const res=await fetch("http://192.168.1.9:3000/api/sendsms",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          lat:location.latitude,
          lon:location.longitude
        })
      })
      const data=await res.json()
      console.log(data)
      if(data.success){
        alert("SOS sent successfully!")
      }
    }catch(error){
      console.log(error)
      alert("Failed to send SOS")
    }
  }

  const getLocation=async()=>{
    const { status } = await Location.requestForegroundPermissionsAsync();
    if(status!=="granted"){
      alert("Permission denied ")
      return
    }
    const loc=await Location.getCurrentPositionAsync({})
    setLocation(loc.coords)
    fetchHospitals(loc.coords.latitude,loc.coords.longitude)
  }

  const handleSOS=async()=>{
    alert("SOS pressed")
  }
  const fetchHospitals=async(lat:number,lon:number)=>{
      const url =
      `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=20&apiKey=${apiKey}`;

      const res=await fetch(url)
      const data=await res.json()

      const hospitalList = data.features.map((item: any) => ({
      name: item.properties.name,
      lat: item.geometry.coordinates[1],
      lon: item.geometry.coordinates[0],
    }));
    setHospitals(hospitalList)
  }

  if(!location) return <View/>
   return (
    <View style={styles.container}>

      {/* MAP */}
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: hospital.lat,
              longitude: hospital.lon,
            }}
            title={hospital.name}
          />
        ))}
      </MapView>

      {/* SOS BUTTON */}
      <Pressable
        style={styles.sosButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.sosText}>🚨 SOS</Text>
      </Pressable>

      {/* CONFIRMATION MODAL */}
      {showModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>⚠ Confirm Emergency</Text>

            <Text style={styles.modalText}>
              Your location will be shared with nearby hospitals.
            </Text>

            <View style={styles.modalButtons}>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.confirmButton}
                onPress={() => {
                  console.log("SOS CONFIRMED");
                  setShowModal(false);
                  sendSOS()
                }}
              >
                <Text style={{ color: "white" }}>Send SOS</Text>
              </Pressable>

            </View>

          </View>
        </View>
      )}

    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  sosButton:{
    position:"absolute",
    bottom:40,
    alignSelf:"center",
    backgroundColor:"red",
    paddingVertical:20,
    paddingHorizontal:40,
    borderRadius:50,
    elevation:5
  },

  sosText:{
    color:"white",
    fontSize:20,
    fontWeight:"bold"
  },
  modalOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
},

modalBox: {
  backgroundColor: "white",
  padding: 25,
  borderRadius: 10,
  width: "80%",
},

modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
},

modalText: {
  marginBottom: 20,
},

modalButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
},

cancelButton: {
  padding: 10,
},

confirmButton: {
  backgroundColor: "red",
  padding: 10,
  borderRadius: 5,
},

});