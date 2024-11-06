---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Stream-rec"
  text: "Automated stream recording solution"
  tagline: "Kotlin-based solution for seamless stream recording across multiple platforms"
  image:
    src: /stream-rec.svg
    width: 200
    height: 200
    alt: Stream-rec logo
  actions:
    - theme: brand
      text: Get Started
      link: /what-is-stream-rec
    - theme: alt
      text: API Guide
      link: /api-guide

features:
  - title: Multi-Platform Support
    details: Supports platforms like Twitch, Douyin, and more for comprehensive stream recording.
  - title: Automated Storage and Upload
    details: Integrates with Rclone for cloud uploads and manages local storage for recorded content.
  - title: Customizable Recording Schedules
    details: Allows users to schedule recording times and automatically manage file names for easy organization.
  - title: Containerized Deployment
    details: Stream-rec can be deployed as a Docker container for easy setup and management.
---
