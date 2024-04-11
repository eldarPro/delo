export async function fetchData() {
  // setLoading(true)
  // const userId = localStorage.getItem('user_id');

  // if (!userId) {
  //   alert('Ключ "user_id" не существует в localStorage или содержит значение null');
  //   setLoading(false)
  //   return false
  // }

  // try {
  //   const docRef = doc(db, "users", userId);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const userData = docSnap.data()
  //     setUserName(userData.name)
  //     setPhone(userData.phone)
  //     setRating(userData.rating)
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     alert("No such document!");
  //   }

    
  //   //console.log('doc data:', docSnap.data())
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }

  // setLoading(false)
};