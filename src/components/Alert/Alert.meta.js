export default {
  name: 'Alert',
  category: 'Feedback',
  description: 'Inline contextual alert/banner for info, success, warning, and error states.',
  variants: [
    { label: 'Info', props: { variant: 'info', title: 'Heads up', children: 'Your plan renews on June 1st.' } },
    { label: 'Success', props: { variant: 'success', title: 'Payment received', children: 'Your invoice has been paid successfully.', dismissible: true } },
    { label: 'Warning', props: { variant: 'warning', title: 'Storage nearly full', children: 'You have used 90% of your storage quota.', action: 'Upgrade plan' } },
    { label: 'Error', props: { variant: 'error', title: 'Request failed', children: 'Could not connect to the server. Please try again.', action: 'Retry', dismissible: true } },
    { label: 'Neutral', props: { variant: 'neutral', children: 'Scheduled maintenance on Sunday 2–4 AM UTC.' } },
  ],
}
