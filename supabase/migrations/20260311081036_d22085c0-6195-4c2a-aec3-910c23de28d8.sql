-- Fix 1: user_subscriptions - restrict "System can manage subscriptions" to service_role
DROP POLICY IF EXISTS "System can manage subscriptions" ON public.user_subscriptions;

CREATE POLICY "Service role can manage subscriptions"
ON public.user_subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add scoped user policy so authenticated users can read their own subscriptions
CREATE POLICY "Users can view their own subscriptions"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Fix 2: sms_messages - restrict insert/update policies to service_role
DROP POLICY IF EXISTS "Service role can insert SMS messages" ON public.sms_messages;
DROP POLICY IF EXISTS "Service role can update SMS messages" ON public.sms_messages;

CREATE POLICY "Service role can insert SMS messages"
ON public.sms_messages
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update SMS messages"
ON public.sms_messages
FOR UPDATE
TO service_role
USING (true);