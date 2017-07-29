function moveExhibitsRecord(oldRef, newRef){
  oldRef.once("value", function(snap){
    newRef.set(snap.value(), function(error){
      if(!error) {
        //oldRef.remove();
      }
    });
  });
}
