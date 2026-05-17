import React from 'react'

export default {
  name: 'FormField',
  category: 'Forms',
  description: 'Compound label + input + validation message wrapper.',
  variants: [
    {
      label: 'Default',
      props: {
        label: 'Email address',
        htmlFor: 'email',
        hint: 'We will never share your email.',
        children: (
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-10 px-3 rounded-[var(--radius-md)] border border-hairline bg-canvas text-ink text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full"
          />
        ),
      },
    },
    {
      label: 'Error',
      props: {
        label: 'Password',
        required: true,
        error: 'Password must be at least 8 characters.',
        children: (
          <input
            type="password"
            className="h-10 px-3 rounded-[var(--radius-md)] border border-error bg-canvas text-ink text-sm outline-none w-full"
          />
        ),
      },
    },
    {
      label: 'Success',
      props: {
        label: 'Username',
        success: 'Username is available!',
        children: (
          <input
            type="text"
            defaultValue="john_doe"
            className="h-10 px-3 rounded-[var(--radius-md)] border border-success bg-canvas text-ink text-sm outline-none w-full"
          />
        ),
      },
    },
  ],
}
