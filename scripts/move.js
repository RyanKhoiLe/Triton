function moveExhibitsRecord(oldRef, newRef){
  oldRef.once("value", function(snap){
    newRef.set(snap.val(), function(error){
      if(!error) {
        //oldRef.remove();
      }
    });
  });
}
