**Note: These files are merely for potential employers to see my code**. The actual updated project is maintained within a private repository, and many critical config files have been removed. 

**Note: This thing is sufficiently complex and does significantly more than can be summarised.** Below I have provided a layman's overview of the project so you can better understand it :+1:

In addition, here's an example of an affiliate website (the link may be broken, or the website empty, as I figure things out):

https://awfulchristmas.com/

# Awful CMS

Awful CMS is an automated affiliate marketing system. 

- Awful CMS is the automated shell of the system
- Awful Manager is the central management platform  
- Awful XXX (Awful Christmas, Awful Fashion etc.) are the affiliate websites it maintains

These affiliate websites are dedicated to the curation of awful products, according to a range of different themes.

It will either flop spectacularly or I will become a self-sufficient millionaire. 

# Awful Stack

This stack includes: 

- Phoenix Framework / Elm (Awful Manager) 
- Phoenix Framework / Elm (Awful XXX)
- Bash / Unix (Awful CMS)
- Nginx Server / Linode VPS
- AWS S3 Bucket

The Awful Manager Elm application is HUGE. It's easily within the top 50 largest Elm applications ever created.

I decided to build the core web applications with Phoenix Framework so that it would require minimal resources to build, run and maintain on the server. 

Elixir has built in concurrency, scales better than anything else I know and has the developer efficiency of Ruby on Rails whilst being 10x faster. 

It's awesome.

# Awful Manager

Awful Manager allows for full control over each of the affiliate websites.

Rather than having to login to each website individually, Awful Manager allows full control over everything from a blazingly fast Elm application interface.

It includes the ability to:

- Monitor websites in both production and devevlopment, with the ability to turn them on and off
- Manage affiliate website products, categories, tags, social media posts, blog posts and updates
- Update environment variables, as well as custom affiliate website text and data
- Build and create new affiliate websites

Oh, and it automatically fetches product information data from Amazon, and (almost) all of Awful Manager's functions can be controlled via keyboard like in Vim. 

swanky. 

# Automation

The core of Awful CMS is designed to automatically generate all affiliate websites at once.

The way it does this is through a wealth of complex bash scripts (there are more than 40 in total), which compile various files into a fully functioning website. 

In order to understand how this is achieved we must take a closer look at the folder structure:

- dependencies 
- shared 
- template 

These folders are where all the website content lives. 'template' contains all common data, 'shared' contains all unique information to each website and 'dependencies' is where all the library files live, so I don't have to download everything again each time I regenerate the affiliate websites. 

- development
- production

These folders are where all the websites live, once they have been compiled and patched together.

- manager 
- other 
- scripts 

'manager' is where Awful Manager lives. 'scripts' contain all the bash scripts to make it all happen, and 'other' simply contains miscellaneous items.


# Initial websites 

Initially there will be a variety of 8 websites to test the profitability of this concept. 

I won't post all their urls for various reasons, however here is the original:

www.awfulchristmas.com

Each website maintains different colour schemes, logos and icons - so they all have a different personalities and feel rather different. Unfortunately these design aspects cannot be automated.

<!-- 

## Why stop at one?

Initially, there was only going to be one dedicated website, but then I thought to myself - why only one? 

I then realised that through automation I could create a number of these websites at only a fraction of the effort spent trying to maintain them.

Furthermore, this system would largely automate the creation of these websites, so that it would be effortless to create more.  
-->

# Questions

Q: Should I hire you?

A: Yeaaaaahh, you should totally hire me.
