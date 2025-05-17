// Get member ID from URL
const params = new URLSearchParams(window.location.search);
const memberId = params.get('id');

if (memberId) {
    fetch(`/member/${memberId}`)
        .then(res => res.json())
        .then(member => {
            document.getElementById("member-details").innerHTML = `
                <h2>${member.name}</h2>
                <p><strong>Role:</strong> ${member.role}</p>
                <p><strong>Email:</strong> ${member.email}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Certifications:</strong> ${member.certifications}</p>
            `;

            // You can customize the values for the boxes based on real data if available
            document.getElementById("gps-info").innerText = member.gps || "Active";
            document.getElementById("heart-rate-info").innerText = member.heartRate || "72 BPM";
            document.getElementById("body-temperature-info").innerText = member.temperature || "36.5°C";
            document.getElementById("accelerometer-info").innerText = member.motion || "Stable";
            document.getElementById("object-detection-info").innerText = member.objectDetection || "None";
            document.getElementById("pressure-sensor-info").innerText = member.pressure || "Normal";

        })
        .catch(err => {
            document.getElementById("member-details").innerHTML = "<p>Error loading member details.</p>";
        });
}
