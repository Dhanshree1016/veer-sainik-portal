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

            // ✅ Make GPS a clickable map link if it's a valid URL
            if (member.gps && member.gps.startsWith("http")) {
                document.getElementById("gps-info").innerHTML = `
                    <a href="${member.gps}" target="_blank" style="color: #00ffff; text-decoration: underline;">
                        Open Location in Google Maps
                    </a>`;
            } else {
                document.getElementById("gps-info").innerText = member.gps || "Active";
            }

            // Other sensor data
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
