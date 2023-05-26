<h1 align="center">
 PaperBrain
 </h1>

https://user-images.githubusercontent.com/83456083/233063742-ca57e432-a4db-4d65-b7eb-20bd78e3ed72.mp4

[YouTube](https://www.youtube.com/watch?v=JnMSISVfTYc)

[PaperBrain](https://www.paperbrain.study)

## About

<p> People publish a lot of fascinating research out to the world, yet the tools to consume this research are quite primitive. It is also really hard to understand the research papers. </p>
  
<p>PaperBrain is the go-to platform for accessing and understanding research papers. We provide a fascinating interface for users to search for papers and return a list of papers with their abstracts and a direct pdf link in a prettified format.

Since research papers are generally difficult to understand, we have added a explain paper feature leveraging a GPT-3 model provided by Open AI. Users can simply copy-paste an excerpt and our primed model will translate it into an easy and understandable form.

</p>

<p>
PaperBrain also allows you to upload your own papers and interact with the in-built GPT assistant to better streamline your research understanding process.
</p>
  

## Steps to Contribute
<p>


Step 1: Fork the repo and Go to your Git terminal and clone it on your machine.

git clone https://github.com/<your_github_username>/paperbrain.git
cd paperbarain
Step 2: Add an upstream link to the main branch in your cloned repo

git remote add upstream https://github.com/<your_github_username>/paperbrain.git
Step 3: Keep your cloned repo up to date by pulling from upstream (this will also avoid any merge conflicts while committing new changes)

git pull upstream main
Step 4: Create your feature branch (This is a necessary step, so don't skip it)

git checkout -b <branch-name>
Step 5: Track and stage your changes.

# Track the changes
 git status

 # After adding required changes
 git add .
Step 6: Commit all the changes (Write commit message as "Small Message")

git commit -m "<your-commit-message>"
Step 7: Push the changes for review

git push origin <branch-name>
Step 8: Create a PR on Github. (Don't just hit the create a pull request button, you must write a PR message to clarify why and what are you contributing)

</p>
 


## Built Using

| Tech              | Link                                                 |
| ----------------- | ---------------------------------------------------- |
| Front End         | [Next.js](https://nextjs.org/)                       |
| Back End          | [Flask](https://flask.palletsprojects.com/en/2.2.x/) |
| Explain Paper Bot | [GPT-3](https://openai.com/api/)                     |
| Styles            | [Tailwind CSS](https://tailwindcss.com/docs/)        |
| Storage Bucket    | [Firebase](https://www.firebase.google.com/)         |
| Hosting           | [Vercel](https://vercel.com/)                        |
| Authentication    | [Auth0](https://www.auth0.com/)                      |

## Contributors

| Name | GitHub |
| ---- | ------ |

Nawed Ali | [nawed2611](https://github.com/nawed2611)

Mohd Arshad | [mdarshad1000](https://github.com/mdarshad1000)

Saad Anzar | [SaadAnzar](https://github.com/SaadAnzar)

## Getting Started

### 1. Clone the repository

```git clone https://github.com/nawed2611/paperbrain.git```

### 2. Change the working directory

```cd paperbrain```

### 3. Install dependencies

```npm install```

### 4. Run the app

```npm run dev```
