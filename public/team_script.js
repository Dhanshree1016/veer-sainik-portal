document.addEventListener("DOMContentLoaded", () => {
    const teamList = document.getElementById("team-list");

    // Data for team members
    const teamMembers = [
        {
            name: "John Doe",
            age: 30,
            id: "12345",
            email: "john.doe@example.com",
            mobile: "9876543210",
            photo: "person1.jpg" // Replace with actual image path
        },
        {
            name: "Jane Smith",
            age: 28,
            id: "67890",
            email: "jane.smith@example.com",
            mobile: "8765432109",
            photo: "person2.jpg" // Replace with actual image path
        },
        {
            name: "Alice Johnson",
            age: 25,
            id: "11223",
            email: "alice.johnson@example.com",
            mobile: "9123456789",
            photo: "person3.jpg" // Replace with actual image path
        },
        {
            name: "Bob Brown",
            age: 35,
            id: "33445",
            email: "bob.brown@example.com",
            mobile: "9234567890",
            photo: "person4.jpg" // Replace with actual image path
        },
        {
            name: "Emma Davis",
            age: 29,
            id: "55678",
            email: "emma.davis@example.com",
            mobile: "9345678901",
            photo: "person5.jpg" // Replace with actual image path
        }
    ];

    // Dynamically add team members to the page
    teamMembers.forEach(member => {
        const memberDiv = document.createElement("div");
        memberDiv.className = "team-member";
        
        memberDiv.innerHTML = `
            <a href="details.html?memberId=${member.id}" style="text-decoration: none; color: inherit;">
                <img src="${'person.jpg'}" alt="${member.name}" class="profile-photo">
                <div class="team-details">
                    <p><span>Name:</span> ${member.name}</p>
                    <p><span>Age:</span> ${member.age}</p>
                    <p><span>ID:</span> ${member.id}</p>
                    <p><span>Email:</span> ${member.email}</p>
                    <p><span>Mobile No:</span> ${member.mobile}</p>
                </div>
            </a>
        `;
        
        teamList.appendChild(memberDiv);
    });
});