/*****************************************
 * 1. Define the new functions
 *****************************************/
const fns = {
	// Bathrooms
	locateBathroom: async () => {
	  return "The nearest bathroom is located down this ramp to my right, through the big white doors on the left, then another left to arrive at the restrooms.";
	},
  
	/*****************************************
	 * Show Schedules
	 *****************************************/
	getShowScheduleForLiveScienceStage: async () => {
	  // Times taken from your data, focusing on the “Live Science Show”
	  return {
		success: true,
		schedule: [
		  {
			time: "11:30 AM",
			show: "Live Science Show",
			location: "Building 1, Live Science Stage",
			included: "Included in General Admission",
		  },
		  {
			time: "1:30 PM",
			show: "Live Science Show",
			location: "Building 1, Live Science Stage",
			included: "Included in General Admission",
		  },
		  {
			time: "3:30 PM",
			show: "Live Science Show",
			location: "Building 1, Live Science Stage",
			included: "Included in General Admission",
		  },
		],
	  };
	},
  
	getShowScheduleForPlanetarium: async () => {
	  // Combining times for “Preschool: Moon Adventure,” “Sky Watch,” and “Space Explorers”
	  return {
		success: true,
		schedule: [
		  {
			time: "10:30 AM",
			show: "Preschool: Moon Adventure",
			location: "Building 2, Planetarium",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		  {
			time: "11:15 AM or 2:15 PM",
			show: "Sky Watch",
			location: "Building 2, Planetarium",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		  {
			time: "1:30 PM",
			show: "Preschool: Moon Adventure",
			location: "Building 2, Planetarium",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		  {
			time: "3:15 PM",
			show: "Space Explorers",
			location: "Building 2, Planetarium",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		],
	  };
	},
  
	getShowScheduleForIMAX: async () => {
	  // Sample IMAX listings across Boeing & PACCAR theaters
	  return {
		success: true,
		schedule: [
		  {
			time: "10:30 AM",
			show: "Backyard Wilderness (Short)",
			location: "Boeing Theater",
			type: "IMAX Documentary",
			ticketsRequired: true,
		  },
		  {
			time: "10:30 AM",
			show: "Blue Whales: Return of the Giants",
			location: "PACCAR Theater",
			type: "IMAX Documentary",
			ticketsRequired: true,
		  },
		  {
			time: "11:15 AM",
			show: "Blue Whales: Return of the Giants 3D",
			location: "Boeing Theater",
			type: "IMAX Documentary",
			ticketsRequired: true,
		  },
		  {
			time: "11:45 AM",
			show: "Fungi: The Web of Life",
			location: "PACCAR Theater",
			type: "IMAX Documentary",
			ticketsRequired: true,
		  },
		  {
			time: "12:30 PM",
			show: "T. rex 3D",
			location: "Boeing Theater",
			type: "IMAX Documentary",
			ticketsRequired: true,
		  },
		  {
			time: "1:00 PM",
			show: "Mufasa: The Lion King",
			location: "PACCAR Theater",
			type: "IMAX Feature Film",
			ticketsRequired: true,
		  },
		  {
			time: "3:00 PM",
			show: "T. rex 3D",
			location: "Boeing Theater",
			type: "IMAX Documentary",
			ticketsRequired: true,
		  },
		  {
			time: "3:30 PM",
			show: "Mufasa: The Lion King",
			location: "PACCAR Theater",
			type: "IMAX Feature Film",
			ticketsRequired: true,
		  },
		  {
			time: "4:45 PM",
			show: "Deep Sky",
			location: "PACCAR Theater",
			type: "IMAX Documentary",
			ticketsRequired: true,
		  },
		  {
			time: "4:45 PM",
			show: "Se7en",
			location: "Boeing Theater",
			type: "IMAX Feature Film",
			ticketsRequired: true,
		  },
		],
	  };
	},
  
	getShowScheduleForLaserShows: async () => {
	  // Times for Laser Dome shows
	  return {
		success: true,
		schedule: [
		  {
			time: "11:45 AM",
			show: "Laser Movie Magic",
			location: "Laser Dome",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		  {
			time: "1:00 PM",
			show: "Laser Jukebox",
			location: "Laser Dome",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		  {
			time: "2:00 PM",
			show: "Laser Movie Magic",
			location: "Laser Dome",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		  {
			time: "3:00 PM",
			show: "Laser Daft Punk",
			location: "Laser Dome",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		  {
			time: "4:00 PM",
			show: "Laser Jukebox",
			location: "Laser Dome",
			included: "Included in General Admission (Timed Tickets Required)",
		  },
		],
	  };
	},
  
	/*****************************************
	 * Directions
	 *****************************************/
	locateButterflyHouse: async () => {
	  return "The Butterfly house is in the same direction as the restroom. But after you go through the white doors, take a right and you will find the Butterfly house there! It is pretty big so hard to miss.";
	},
  
	locateSpaceExhibit: async () => {
	  return "Oh, thats very close. Just go down this ramp and you will find the planetarium to your right, and the space exhibit is the rest of the room!";
	},
  
	locateTidepool: async () => {
	  return "Go Down this ramp into space, then turn right at the whale skeleton. There you will find our tidepool and accessible tank as well.";
	},
  };
  
  /*****************************************
   * 2. Create the WebRTC Peer Connection
   *****************************************/
  const peerConnection = new RTCPeerConnection();
  
  /*****************************************
   * 3. Handle inbound audio (attach stream)
   *****************************************/
  peerConnection.ontrack = (event) => {
	const el = document.createElement('audio');
	el.srcObject = event.streams[0];
	el.autoplay = el.controls = true;
	document.body.appendChild(el);
  };
  
  /*****************************************
   * 4. Create a Data Channel for text commands
   *****************************************/
  const dataChannel = peerConnection.createDataChannel('response');
  
  /*****************************************
   * 5. Advertise the new tools (functions)
   *****************************************/
  function configureData() {
	console.log('Configuring data channel');
	const event = {
	  type: 'session.update',
	  session: {
		modalities: ['text', 'audio'],
		// Only museum-related tools
		tools: [
		  { type: 'function', name: 'locateBathroom', description: 'Directs to the nearest bathroom' },
		  { type: 'function', name: 'getShowScheduleForLiveScienceStage', description: 'Returns Live Science Stage schedule' },
		  { type: 'function', name: 'getShowScheduleForPlanetarium', description: 'Returns Planetarium schedule' },
		  { type: 'function', name: 'getShowScheduleForIMAX', description: 'Returns IMAX shows schedule' },
		  { type: 'function', name: 'getShowScheduleForLaserShows', description: 'Returns Laser Show schedule' },
		  { type: 'function', name: 'locateButterflyHouse', description: 'Directions to the Butterfly House' },
		  { type: 'function', name: 'locateSpaceExhibit', description: 'Directions to the Space Exhibit' },
		  { type: 'function', name: 'locateTidepool', description: 'Directions to the Tidepool exhibit' },
		],
	  },
	};
	dataChannel.send(JSON.stringify(event));
  }
  
  dataChannel.addEventListener('open', (ev) => {
	console.log('Opening data channel', ev);
	configureData();
  });
  
  /*****************************************
   * 6. Listen for incoming messages (function calls)
   *****************************************/
  dataChannel.addEventListener('message', async (ev) => {
	const msg = JSON.parse(ev.data);
  
	// If the remote side is calling one of our local museum functions...
	if (msg.type === 'response.function_call_arguments.done') {
	  const fn = fns[msg.name];
	  if (fn !== undefined) {
		console.log(`Calling local function ${msg.name} with ${msg.arguments}`);
		const args = msg.arguments ? JSON.parse(msg.arguments) : {};
		const result = await fn(args);
  
		console.log('result', result);
		// Respond to the remote side with the function’s output
		const event = {
		  type: 'conversation.item.create',
		  item: {
			type: 'function_call_output',
			call_id: msg.call_id, // call_id from the function_call message
			output: JSON.stringify(result), // result of the function
		  },
		};
		dataChannel.send(JSON.stringify(event));
	  }
	}
  });
  
  /*****************************************
   * 7. Capture microphone and finalize WebRTC
   *****************************************/
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
	// Add mic tracks to the PeerConnection
	stream.getTracks().forEach((track) =>
	  peerConnection.addTransceiver(track, { direction: 'sendrecv' })
	);
  
	// Create an offer
	peerConnection.createOffer().then((offer) => {
	  peerConnection.setLocalDescription(offer);
  
	  // Send the SDP offer to your Realtime WebRTC API relay
	  fetch('/rtc-connect', {
		method: 'POST',
		body: offer.sdp,
		headers: {
		  'Content-Type': 'application/sdp',
		},
	  })
		.then((r) => r.text())
		.then((answer) => {
		  // Accept answer from the Realtime WebRTC API
		  peerConnection.setRemoteDescription({
			sdp: answer,
			type: 'answer',
		  });
		});
	});
  });
  